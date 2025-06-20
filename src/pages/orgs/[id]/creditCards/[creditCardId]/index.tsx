import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {creditCardApi} from '^models/CreditCard/api';
import {creditCardSubjectAtom} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {OrgCreditCardShowPage} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage';
import {ShowRoutingPage} from '^clients/private/_components/rest-pages/ShowPage/ShowRoutingPage';

export const OrgCreditCardShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/creditCards/[creditCardId]',
    path: (orgId: number, id: number) =>
        pathReplace(OrgCreditCardShowPageRoute.pathname, {
            id: orgId,
            creditCardId: id,
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
            subjectAtom={creditCardSubjectAtom}
            endpoint={(subjectId, orgId) => creditCardApi.show(orgId, subjectId)}
        >
            <OrgCreditCardShowPage />
        </ShowRoutingPage>
    );
}
