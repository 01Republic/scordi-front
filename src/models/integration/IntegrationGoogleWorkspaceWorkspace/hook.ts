import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {integrationGoogleWorkspaceWorkspaceApi} from './api';

export const useGoogleWorkspaceInDetailPage = () => {
    const orgId = useOrgIdParam();
    const workspaceId = useIdParam('workspaceId');

    return useQuery({
        queryKey: ['GoogleWorkspaceDetailPage', orgId, workspaceId],
        enabled: !!orgId && !isNaN(orgId) && !!workspaceId,
        queryFn: () => integrationGoogleWorkspaceWorkspaceApi.show(orgId, workspaceId).then((res) => res.data),
    });
};
