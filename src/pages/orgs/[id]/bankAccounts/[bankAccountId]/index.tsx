import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {creditCardIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {creditCardSubjectAtom} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {ShowRoutingPage} from '^clients/private/_components/rest-pages/ShowPage/ShowRoutingPage';
import {OrgBankAccountShowPage} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage';

export const OrgBankAccountShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/bankAccount/[bankAccountId]',
    path: (orgId: number, id: number) =>
        pathReplace(OrgBankAccountShowPageRoute.pathname, {
            id: orgId,
            bankAccountId: id,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', creditCardId: '1'}}],
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
            subjectIdParamKey="creditCardId"
            subjectIdParamAtom={creditCardIdParamState}
            subjectAtom={creditCardSubjectAtom}
            endpoint={(subjectId, orgId) => creditCardApi.show(orgId, subjectId)}
        >
            <OrgBankAccountShowPage />
        </ShowRoutingPage>
    );
}
