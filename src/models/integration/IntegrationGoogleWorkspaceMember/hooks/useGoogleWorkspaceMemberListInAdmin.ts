import {useState} from 'react';
import {integrationGoogleWorkspaceMemberAdminApi} from '../api';
import {FindAllIntegrationGoogleWorkspaceMemberQueryDto} from '../type/FindAllIntegrationGoogleWorkspaceMember.query.dto';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';

export const useGoogleWorkspaceMemberListInAdmin = (
    orgId: number,
    workspaceId: number,
    params: FindAllIntegrationGoogleWorkspaceMemberQueryDto,
) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useGoogleWorkspaceMemberListInAdmin', orgId, workspaceId, query],
        queryFn: () => integrationGoogleWorkspaceMemberAdminApi.index(workspaceId || 0, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const movePage = (page: number) => setQuery((q) => ({...q, page}));
    const changePageSize = (itemsPerPage: number) => setQuery((q) => ({...q, itemsPerPage}));

    return {...queryResult, search: setQuery, movePage, changePageSize};
};
