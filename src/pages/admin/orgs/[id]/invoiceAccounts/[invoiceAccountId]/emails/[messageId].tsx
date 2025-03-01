import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminOrgInvoiceAccountEmailShowPage} from '^admin/orgs/AdminOrgInvoiceAccountEmailShowPage';

export const AdminOrgInvoiceAccountEmailShowPageRoute = pathRoute({
    pathname: '/admin/orgs/[id]/invoiceAccounts/[invoiceAccountId]/emails/[messageId]',
    path: (id: number, invoiceAccountId: number, messageId: string) =>
        pathReplace(AdminOrgInvoiceAccountEmailShowPageRoute.pathname, {
            id,
            invoiceAccountId,
            messageId,
        }),
});

export default function Page() {
    return <AdminOrgInvoiceAccountEmailShowPage />;
}
