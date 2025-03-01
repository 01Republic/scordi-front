import {useQuery} from '@tanstack/react-query';
import {invoiceAccountGmailTestApi} from '^models/InvoiceAccount/api';
import {AdminOrgInvoiceAccountEmailShowPageRoute} from '^pages/admin/orgs/[id]/invoiceAccounts/[invoiceAccountId]/emails/[messageId]';

interface UseGmailContentOption {
    orgId: number;
    invoiceAccountId: number;
    messageId: string;
}

export const useGmailContent = (option: UseGmailContentOption) => {
    const {orgId, invoiceAccountId, messageId} = option;

    const email = useQuery({
        queryKey: ['AdminOrgInvoiceAccountEmailShowPage', orgId, invoiceAccountId, messageId],
        queryFn: () => invoiceAccountGmailTestApi.show(invoiceAccountId, messageId, {readable: true}),
        enabled: !!orgId && !!invoiceAccountId && !!messageId,
        retry: false,
    });

    const original = useQuery({
        queryKey: ['AdminOrgInvoiceAccountEmailShowPage.raw_data', orgId, invoiceAccountId, messageId],
        queryFn: () => invoiceAccountGmailTestApi.show(invoiceAccountId, messageId, {readable: false}),
        enabled: !!orgId && !!invoiceAccountId && !!messageId,
        retry: false,
    });

    const url = AdminOrgInvoiceAccountEmailShowPageRoute.url(orgId, invoiceAccountId, messageId);

    return {
        email,
        original,
        url,
    };
};
