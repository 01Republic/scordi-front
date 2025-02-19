import {useQuery} from '@tanstack/react-query';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useState} from 'react';

export const useEmailItemsOfInvoiceAccountByAdmin = (orgId?: number, invoiceAccountId?: number) => {
    const [id, setId] = useState(invoiceAccountId);
    const queryResult = useQuery({
        queryKey: ['useEmailItemsOfInvoiceAccountByAdmin', orgId, id],
        queryFn: () => invoiceAccountApi.destroyV3(orgId!, invoiceAccountId!).then((res) => res.data),
        enabled: !!orgId && !!id,
    });

    return {
        ...queryResult,
        id,
        search: setId,
        reload: queryResult.refetch,
    };
};
