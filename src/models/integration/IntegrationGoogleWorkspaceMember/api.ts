import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {IntegrationGoogleWorkspaceMemberDto} from './type/IntegrationGoogleWorkspaceMember.dto';
import {FindAllIntegrationGoogleWorkspaceMemberQueryDto} from './type/FindAllIntegrationGoogleWorkspaceMember.query.dto';
import {TeamMemberDto} from '^models/TeamMember';

export const integrationGoogleWorkspaceMemberApi = {
    // 워크스페이스에 등록된 계정 조회
    index(orgId: number, workspaceId: number, params: FindAllIntegrationGoogleWorkspaceMemberQueryDto) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${workspaceId}/google-workspace-members`;
        return api.get(url, {params}).then(paginatedDtoOf(IntegrationGoogleWorkspaceMemberDto));
    },

    // 워크스페이스 멤버목록 동기화
    create(orgId: number, workspaceId: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${workspaceId}/google-workspace-members`;
        return api.post(url).then(paginatedDtoOf(IntegrationGoogleWorkspaceMemberDto));
    },

    // 연결된 구성원 조회 TeamMemberDto
    teamMembers(orgId: number, workspaceId: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${workspaceId}/google-workspace-members/team-members`;
        return api.get(url).then(paginatedDtoOf(TeamMemberDto));
    },

    // 멤버 제거
    destroy(orgId: number, workspaceId: number, id: number) {
        const url = `/organizations/${orgId}/google-workspace/workspaces/${workspaceId}/google-workspace-members/${id}`;
        return api.delete(url).then(oneDtoOf(IntegrationGoogleWorkspaceMemberDto));
    },
};
