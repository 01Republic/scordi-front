import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {bankAccountIdParamState} from '^atoms/common';
import {ShowRoutingPage} from '^clients/private/_components/rest-pages/ShowPage/ShowRoutingPage';
import {OrgBankAccountShowPage} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage';
import {bankAccountApi} from '^models/BankAccount/api';
import {bankAccountSubjectAtom} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/atom';

export const OrgBankAccountShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/bankAccounts/[bankAccountId]',
    path: (orgId: number, id: number) =>
        pathReplace(OrgBankAccountShowPageRoute.pathname, {
            id: orgId,
            bankAccountId: id,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', bankAccountId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    return (
        <ShowRoutingPage
            subjectIdParamKey="bankAccountId"
            subjectIdParamAtom={bankAccountIdParamState}
            subjectAtom={bankAccountSubjectAtom}
            endpoint={(subjectId, orgId) => bankAccountApi.show(orgId, subjectId)}
        >
            <OrgBankAccountShowPage />
        </ShowRoutingPage>
    );
}
