import React, {useEffect} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgHomePage as Page} from '^v3/V3OrgHomePage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {GmailAgentProgress, useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {createInvoiceAccount, getInvoiceAccounts, renewInvoiceAccount} from '^api/invoiceAccount.api';
import {GmailAgent} from '^api/tasting.api';
import {getCreateInvoiceAccountFromTo} from '^types/invoiceAccount.type';
import {toast} from 'react-toastify';
import {useModal} from '^v3/share/modals/useModal';
import {renewInvoiceAccountAtom, renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';

export const V3OrgHomePageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]',
    path: (orgId: number) => pathReplace(V3OrgHomePageRoute.pathname, {orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'org-home', 'google-compliance'])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgHomePage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);
    const {accessTokenData, complete, noRunning} = useGoogleAccessTokenCallback(V3OrgHomePageRoute.path(orgId), [
        orgId,
    ]);
    const {isShow: isRenewModalOpen, close: closeRenewModal} = useModal(renewInvoiceAccountModal);
    const [targetInvoiceAccount, initInvoiceAccount] = useRecoilState(renewInvoiceAccountAtom);

    /**
     * 청구메일 계정 추가시, 구글계정 인증 콜백으로부터 리디렉션 된 경우
     * 청구메일게정 생성 요청을 통해 accessTokenData 를 백엔드로 전송하고,
     * 백엔드는 accessTokenData 를 통해 인보이스 메일 수집과 동시에
     * 청구메일 계정을 디비에 새롭게 생성합니다.
     * 프론트는 요청이 완료되면 필요한 리소스를 다시 로딩합니다.
     */
    useEffect(() => {
        if (!orgId) return;
        // 청구메일 추가 콜백으로부터 리디렉션 된 경우가 아니라면 accessTokenData 는 null 입니다.
        if (!accessTokenData) {
            console.log('token data initiated');
            return;
        }

        if (!accessTokenData.scope.includes('https://www.googleapis.com/auth/gmail.readonly')) {
            toast.error('에러가 발생했습니다. 다시 한 번 추가해주세요!');
            noRunning();
            return;
        }

        const gmailAgent = new GmailAgent(accessTokenData);
        const tokenData = gmailAgent.getGmailAgentTokenData();

        // 토큰이 만료되어 갱신하는 경우
        if (isRenewModalOpen && targetInvoiceAccount) {
            renewInvoiceAccount(orgId, targetInvoiceAccount.id, {tokenData})
                .then(() => {
                    complete();
                    /**
                     * renew invoice account도 캡슐화 필요함.
                     */
                    closeRenewModal();
                    initInvoiceAccount(null);
                    router.replace(V3OrgHomePageRoute.path(orgId));
                })
                .catch(() => {
                    noRunning();
                    toast.error('에러가 발생했습니다. 관리자에게 문의해주세요');
                });
        }

        // alert(accessTokenData.access_token);

        gmailAgent.getProfile().then((userData) => {
            createInvoiceAccount(orgId, {
                email: userData.email,
                image: userData.picture,
                tokenData,
                gmailQueryOptions: getCreateInvoiceAccountFromTo(),
            })
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    const code = err.response?.data?.code;
                    // 중복된 계정 오류 시, invoiceAccount sync API 호출
                    if (code === 'DUPLICATED_ENTITY') {
                        getInvoiceAccounts(orgId, {where: {email: userData.email}}).then((res) => {
                            const {items, pagination} = res.data;
                            if (pagination.totalItemCount > 0) {
                                const [account] = items;
                                renewInvoiceAccount(orgId, account.id, {tokenData})
                                    .then(() => complete())
                                    .catch(() => {
                                        noRunning();
                                        toast.error('에러가 발생했습니다. 관리자에게 문의해주세요');
                                    });
                            } else {
                                complete();
                                toast.error('에러가 발생했습니다. 관리자에게 문의해주세요');
                            }
                        });
                    }
                });
        });
    }, [orgId, accessTokenData]);

    if (!orgId) return <></>;

    return <Page />;
}
