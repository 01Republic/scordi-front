import {api} from '^api/api';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {IntegrationSlackMemberDto} from './type/IntegrationSlackMember.dto';
import {FindAllIntegrationSlackMemberQueryDto} from './type/FindAllIntegrationSlackMember.query.dto';

/**
 * [조직] Integration Slack Workspace Member API
 */
export const integrationSlackMemberApi = {
    // 스코디에 저장된 슬랙계정 조회
    index(orgId: number, workspaceId: number, params: FindAllIntegrationSlackMemberQueryDto) {
        const url = `/organizations/${orgId}/slack/workspaces/${workspaceId}/slack-members`;
        return api.get(url, {params}).then(paginatedDtoOf(IntegrationSlackMemberDto));
    },

    // 슬랙 워크스페이스로부터 슬랙계정 불러오기(동기화)
    create(orgId: number, workspaceId: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${workspaceId}/slack-members`;
        return api.post(url).then(listDtoOf(IntegrationSlackMemberDto));
    },

    // 슬랙 멤버 제거
    destroy(orgId: number, workspaceId: number, id: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${workspaceId}/slack-members/${id}`;
        return api.delete(url).then(oneDtoOf(IntegrationSlackMemberDto));
    },

    linkTeamMember(orgId: number, workspaceId: number, id: number, teamMemberId: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${workspaceId}/slack-members/${id}/team-members/${teamMemberId}`;
        return api.post(url).then(oneDtoOf(IntegrationSlackMemberDto));
    },

    unlinkTeamMember(orgId: number, workspaceId: number, id: number, teamMemberId: number) {
        const url = `/organizations/${orgId}/slack/workspaces/${workspaceId}/slack-members/${id}/team-members/${teamMemberId}`;
        return api.delete(url).then(oneDtoOf(IntegrationSlackMemberDto));
    },
};
