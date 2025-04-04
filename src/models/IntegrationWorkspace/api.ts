import {FindAllIntegrationWorkspaceQueryDto, IntegrationWorkspaceDto} from './type';
import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';

// [조직] Integrations API
export const integrationWorkspacesApi = {
    index(orgId: number, params: FindAllIntegrationWorkspaceQueryDto) {
        const url = `/organizations/${orgId}/integration-workspaces`;
        return api.get(url, {params}).then(paginatedDtoOf(IntegrationWorkspaceDto));
    },
};
