import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    CreateTeamMembershipDto,
    FindAllTeamMembershipQueryDto,
    TeamMembershipDto,
    UpdateTeamMembershipDto,
} from '^models/TeamMembership/type';

export const teamMembershipApi = {
    // 팀과 팀멤버의 연결 목록
    index(orgId: number, params?: FindAllTeamMembershipQueryDto) {
        const url = `/organizations/${orgId}/team-memberships`;
        return api.get(url, {params}).then(paginatedDtoOf(TeamMembershipDto));
    },

    // 팀과 팀멤버의 연결 생성
    create(orgId: number, dto: CreateTeamMembershipDto) {
        const url = `/organizations/${orgId}/team-memberships`;
        return api.post(url, dto).then(oneDtoOf(TeamMembershipDto));
    },

    // 팀과 팀멤버의 연결 수정
    update(orgId: number, id: number, dto: UpdateTeamMembershipDto) {
        const url = `/organizations/${orgId}/team-memberships/${id}`;
        return api.patch(url, dto).then(oneDtoOf(TeamMembershipDto));
    },

    // 팀과 팀멤버의 연결 삭제
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team-memberships/${id}`;
        return api.delete(url);
    },
};
