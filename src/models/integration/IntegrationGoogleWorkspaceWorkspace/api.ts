import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    IntegrationGoogleWorkspaceWorkspaceDto,
    CreateGoogleAdminTeamMembersRequestDto,
    FindAllIntegrationGoogleWorkspaceQueryDto,
} from './type';

/**
 * [조직] Integration GoogleWorkspace Workspace API
 */
export const integrationGoogleWorkspaceWorkspaceApi = {
    // 연결된 워크스페이스 조회
    index(orgId: number, params?: FindAllIntegrationGoogleWorkspaceQueryDto) {
        const url = `/organizations/${orgId}/google-workspace/workspaces`;
        return api.get(url, {params}).then(paginatedDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },

    // 연결된 워크스페이스 상세
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${id}`;
        return api.get(url).then(oneDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },

    // 워크스페이스 등록 및 동기화 (구글 인증으로 추가)
    create(orgId: number, dto: CreateGoogleAdminTeamMembersRequestDto) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/by-code`;
        return api.post(url, dto).then(oneDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },

    // 연결된 워크스페이스 수정
    update(orgId: number, id: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${id}`;
        return api.patch(url).then(oneDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },

    // 연결된 워크스페이스 최신화 (A + B) - 생성시 by-code 에서 했던걸 재실행 하는 개념
    sync(orgId: number, id: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${id}/sync`;
        return api.patch(url).then(oneDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },

    // 연결된 워크스페이스 제거
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${id}`;
        return api.delete(url).then(oneDtoOf(IntegrationGoogleWorkspaceWorkspaceDto));
    },
};
