import {useQuery} from '@tanstack/react-query';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {useIdParam} from '^atoms/common';

export const useSlackWorkspaceInDetailPage = () => {
    const orgId = useIdParam('id');
    const workspaceId = useIdParam('slackWorkspaceId');

    return useQuery({
        queryKey: ['SlackWorkspaceDetailPage', orgId, workspaceId],
        enabled: !!orgId && !isNaN(orgId) && !!workspaceId,
        queryFn: () => integrationSlackWorkspaceApi.show(orgId, workspaceId).then((res) => res.data),
    });
};
