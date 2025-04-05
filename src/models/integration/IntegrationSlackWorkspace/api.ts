import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {IntegrationSlackWorkspaceDto} from './type/IntegrationSlackWorkspace.dto';

/**
 * [조직] Integration Slack Workspace API
 */
export const integrationSlackWorkspaceApi = {
    // 연결된 워크스페이스 조회
    index(orgId: number) {
        const url = `/organizations/${orgId}/slack/workspaces`;
        return api.get(url).then(paginatedDtoOf(IntegrationSlackWorkspaceDto));
    },

    // 연결된 워크스페이스 상세
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${id}`;
        return api.get(url).then(oneDtoOf(IntegrationSlackWorkspaceDto));
    },

    // 연결된 워크스페이스 최신화
    update(orgId: number, id: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${id}`;
        return api.patch(url).then(oneDtoOf(IntegrationSlackWorkspaceDto));
    },

    // 연결된 워크스페이스 제거
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${id}`;
        return api.delete(url).then(oneDtoOf(IntegrationSlackWorkspaceDto));
    },
};
