import {useQuery} from '@tanstack/react-query';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {useIdParam, useOrgIdParam} from '^atoms/common';

export const useSlackWorkspaceInDetailPage = () => {
    const orgId = useOrgIdParam();
    const workspaceId = useIdParam('slackWorkspaceId');

    return useQuery({
        queryKey: ['SlackWorkspaceDetailPage', orgId, workspaceId],
        enabled: !!orgId && !isNaN(orgId) && !!workspaceId,
        queryFn: () => integrationSlackWorkspaceApi.show(orgId, workspaceId).then((res) => res.data),
    });
};
