import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    CreateTeamMembershipDto,
    FindAllTeamMembershipQueryDto,
    FindOneTeamMembershipQueryDto,
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
    update(orgId: number, dto: UpdateTeamMembershipDto) {
        const url = `/organizations/${orgId}/team-memberships`;
        return api.patch(url, dto).then(oneDtoOf(TeamMembershipDto));
    },

    // 팀과 팀멤버의 연결 삭제
    destroy(orgId: number, params: FindOneTeamMembershipQueryDto) {
        const url = `/organizations/${orgId}/team-memberships`;
        return api.delete(url, {params});
    },

    // 팀과 팀멤버의 연결 삭제 (다건실행)
    destroyAll(orgId: number, params: FindOneTeamMembershipQueryDto[]) {
        const url = `/organizations/${orgId}/team-memberships/all`;
        return api.delete(url, {params});
    },
};
