import {useQuery} from '@tanstack/react-query';
import {FindAllInvoiceAccountQueryDto} from '^models/InvoiceAccount/type';
import {useState} from 'react';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {Paginated} from '^types/utils/paginated.dto';

export const useInvoiceAccountsOfOrgByAdmin = (orgId?: number, defaultParams?: FindAllInvoiceAccountQueryDto) => {
    const [query, setQuery] = useState(defaultParams);
    const queryResult = useQuery({
        queryKey: ['useInvoiceAccountsOfOrgByAdmin', orgId, query],
        queryFn: () => invoiceAccountApi.index(orgId!, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId,
    });

    const movePage = (page: number) => setQuery((q) => ({...q, page}));
    const resetPage = () => setQuery({...query, page: 1});
    const changePageSize = (itemsPerPage: number) => setQuery({...query, page: 1, itemsPerPage});

    return {
        ...queryResult,
        query,
        search: setQuery,
        reload: queryResult.refetch,
        movePage,
        resetPage,
        changePageSize,
    };
};
