import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllGoogleWorkspaceOauthTokenActivityQueryDto} from './type/FindAllGoogleWorkspaceOauthTokenActivity.query.dto';
import {integrationGoogleWorkspaceActivityAdminApi} from './api';

export const useGoogleWorkspaceOauthTokenActivityListInAdmin = (
    orgId: number,
    workspaceId: number,
    params: FindAllGoogleWorkspaceOauthTokenActivityQueryDto,
) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useGoogleWorkspaceMemberListInAdmin', orgId, workspaceId, query],
        queryFn: () =>
            integrationGoogleWorkspaceActivityAdminApi.index(workspaceId || 0, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    // useEffect(() => {
    //     setQuery(params);
    // }, [params]);

    const movePage = (page: number) => setQuery((q) => ({...q, page}));
    const changePageSize = (itemsPerPage: number) => setQuery((q) => ({...q, itemsPerPage}));

    return {...queryResult, search: setQuery, movePage, changePageSize};
};
