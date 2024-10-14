import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {invoiceAccountIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {OrgInvoiceAccountShowPage} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage';
import {invoiceAccountSubjectAtom} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/atom';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {useCurrentOrg} from '^models/Organization/hook';

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
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const subjectId = useRouterIdParamState('invoiceAccountId', invoiceAccountIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;
    if (!subjectId || isNaN(subjectId)) return <></>;

    return <OrgInvoiceAccountShowPage />;
}
