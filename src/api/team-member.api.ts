import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {TeamMemberDto, CreateTeamMemberDto, UpdateTeamMemberDto} from '^types/team-member.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const teamMemberApi = {
    index(orgId: number, params?: FindAllQueryDto<TeamMemberDto>) {
        const url = `/organizations/${orgId}/teams/members`;
        return api.get<Paginated<TeamMemberDto>>(url, {params});
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/teams/members/${id}`;
        return api.get<TeamMemberDto>(url);
    },

    create(orgId: number, data: CreateTeamMemberDto) {
        const url = `/organizations/${orgId}/teams/members`;
        return api.post<TeamMemberDto>(url, data);
    },

    update(orgId: number, id: number, data: UpdateTeamMemberDto) {
        const url = `/organizations/${orgId}/teams/members/${id}`;
        return api.patch<TeamMemberDto>(url, data);
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/teams/members/${id}`;
        return api.delete<TeamMemberDto>(url);
    },
};
