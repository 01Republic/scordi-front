import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {usePaginateUtils} from '^hooks/usePagedResource';
import {codefAccountAdminApi} from '../api';
import {FindAllAccountQueryForAdminDto} from '../type/find-all-account.query.for-admin.dto';

/***
 * ADMIN
 */

export const useAdminCodefAccounts2 = (orgId: number | undefined, params: FindAllAccountQueryForAdminDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['admin/useAdminCodefAccounts2', orgId, query],
        queryFn: () => {
            const q = {...query};
            q.where ??= {};
            q.where.orgId = orgId;
            return codefAccountAdminApi.index(q).then((res) => res.data);
        },
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};
