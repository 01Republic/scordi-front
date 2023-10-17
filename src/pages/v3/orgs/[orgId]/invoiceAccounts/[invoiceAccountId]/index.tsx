import React, {useEffect} from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {V3OrgInvoiceAccountShowPage} from '^v3/V3OrgInvoiceAccountShowPage';
import {useRouter} from 'next/router';
import {invoiceAccountIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {useCurrentInvoiceAccount} from '^v3/V3OrgInvoiceAccountShowPage/atom';

export const V3OrgInvoiceAccountShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/invoiceAccounts/[invoiceAccountId]',
    path: (orgId: number, invoiceAccountId: number) =>
        pathReplace(V3OrgInvoiceAccountShowPageRoute.pathname, {
            orgId,
            invoiceAccountId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', invoiceAccountId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            'org-home',
            'google-compliance',
            'publicTasting',
        ])),
    },
});

export default function Page() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const invoiceAccountId = useRouterIdParamState('invoiceAccountId', invoiceAccountIdParamState);
    useCurrentOrg(orgId);
    const {loadCurrentInvoiceAccount} = useCurrentInvoiceAccount();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || !invoiceAccountId) return;
        loadCurrentInvoiceAccount(orgId, invoiceAccountId);
    }, [router.isReady, orgId, invoiceAccountId]);

    if (!orgId || !invoiceAccountId) return <></>;

    return <V3OrgInvoiceAccountShowPage />;
}
