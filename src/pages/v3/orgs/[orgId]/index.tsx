import React, {useEffect} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {V3OrgHomePage as Page} from '^v3/V3OrgHomePage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {createInvoiceAccount} from '^api/invoiceAccount.api';
import {GmailAgent} from '^api/tasting.api';

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
        ...(await serverSideTranslations(locale, [...v3CommonRequires, 'org-home'])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgHomePage() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);
    const {accessTokenData} = useGoogleAccessTokenCallback(V3OrgHomePageRoute.path(orgId), [orgId]);

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
        if (!accessTokenData) return;

        const gmailAgent = new GmailAgent(accessTokenData);

        gmailAgent.getProfile().then((userData) => {
            const tokenData = gmailAgent.accessTokenData;
            createInvoiceAccount(orgId, {
                email: userData.email,
                image: userData.picture,
                tokenData: {
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    expireAt: tokenData.expires_in,
                },
            }).then(() => {
                window.location.reload();
            });
        });
    }, [orgId, accessTokenData]);

    if (!orgId) return <></>;

    return <Page />;
}
