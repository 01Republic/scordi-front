import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {invoiceAccountIdParamState} from '^atoms/common';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {invoiceAccountSubjectAtom} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/atom';
import {OrgInvoiceAccountShowPage} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage';
import {ShowRoutingPage} from '^clients/private/_components/rest-pages/ShowPage/ShowRoutingPage';

export const OrgInvoiceAccountShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/invoiceAccounts/[invoiceAccountId]',
    path: (orgId: number, id: number) =>
        pathReplace(OrgInvoiceAccountShowPageRoute.pathname, {
            id: orgId,
            invoiceAccountId: id,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', invoiceAccountId: '1'}}],
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
            subjectIdParamKey="invoiceAccountId"
            subjectIdParamAtom={invoiceAccountIdParamState}
            subjectAtom={invoiceAccountSubjectAtom}
            endpoint={(subjectId, orgId) => invoiceAccountApi.show(orgId, subjectId)}
        >
            <OrgInvoiceAccountShowPage />
        </ShowRoutingPage>
    );
}
