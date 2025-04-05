import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useIdParam} from '^atoms/common';
import {FindAllIntegrationSlackMemberQueryDto} from './type/FindAllIntegrationSlackMember.query.dto';
import {integrationSlackMemberApi} from './api';
import {Paginated} from '^types/utils/paginated.dto';

export const useSlackMembersInDetailPage = (params: FindAllIntegrationSlackMemberQueryDto) => {
    const [_params, setParams] = useState(params);
    const orgId = useIdParam('id');
    const workspaceId = useIdParam('slackWorkspaceId');
    const result = useQuery({
        queryKey: ['SlackWorkspaceMemberList', orgId, workspaceId, _params],
        enabled: !!orgId && !!workspaceId,
        queryFn: () => integrationSlackMemberApi.index(orgId, workspaceId, _params).then((res) => res.data),
        initialData: Paginated.init(),
    });

    return {
        ...result,
        params: _params,
        search: setParams,
    };
};
