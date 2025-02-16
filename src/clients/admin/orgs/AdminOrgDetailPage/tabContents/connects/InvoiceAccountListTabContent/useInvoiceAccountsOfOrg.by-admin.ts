import {useQuery} from '@tanstack/react-query';
import {FindAllInvoiceAccountQueryDto} from '^models/InvoiceAccount/type';
import {useState} from 'react';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';

export const useInvoiceAccountsOfOrgByAdmin = (orgId?: number, params?: FindAllInvoiceAccountQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useInvoiceAccountsOfOrgByAdmin', orgId, query],
        queryFn: () => invoiceAccountApi.index(orgId!, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    const movePage = (page: number) => setQuery((_query) => ({..._query, page}));

    return {
        ...queryResult,
        query,
        search: setQuery,
        reload: queryResult.refetch,
        movePage,
    };
};
