import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {integrationGoogleWorkspaceWorkspaceApi} from './api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllIntegrationGoogleWorkspaceQueryDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {useState} from 'react';

export const useGoogleWorkspaceInDetailPage = () => {
    const orgId = useOrgIdParam();
    const workspaceId = useIdParam('workspaceId');

    return useQuery({
        queryKey: ['GoogleWorkspaceDetailPage', orgId, workspaceId],
        enabled: !!orgId && !isNaN(orgId) && !!workspaceId,
        queryFn: () => integrationGoogleWorkspaceWorkspaceApi.show(orgId, workspaceId).then((res) => res.data),
    });
};

export const useGoogleWorkspaceListInAdmin = (orgId: number, params: FindAllIntegrationGoogleWorkspaceQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useGoogleWorkspaceListInAdmin', orgId, query],
        queryFn: () => integrationGoogleWorkspaceWorkspaceApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const movePage = (page: number) => setQuery((q) => ({...q, page}));
    const changePageSize = (itemsPerPage: number) => setQuery((q) => ({...q, itemsPerPage}));

    return {...queryResult, search: setQuery, movePage, changePageSize};
};
