import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {GmailDetailPage} from '^components/lib/gmail/gmail-finder';

export const AdminOrgInvoiceAccountEmailShowPage = memo(function AdminOrgAccountEmailShowPage() {
    const router = useRouter();
    const orgId = Number(router.query.id);
    const invoiceAccountId = Number(router.query.invoiceAccountId);
    const messageId = String(router.query.messageId);

    return <GmailDetailPage orgId={orgId} invoiceAccountId={invoiceAccountId} messageId={messageId} />;
});
