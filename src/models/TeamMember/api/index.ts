import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    TeamMemberDto,
    CreateTeamMemberDto,
    UpdateTeamMemberDto,
    TeamMemberSubscriptionDto,
} from '^models/TeamMember/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {SubscriptionDto} from '^models/Subscription/types';

export const teamMemberApi = {
    index(orgId: number, params?: FindAllQueryDto<TeamMemberDto>) {
        const url = `/organizations/${orgId}/team_members`;
        return api.get<Paginated<TeamMemberDto>>(url, {params}).then(paginatedDtoOf(TeamMemberDto));
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.get<TeamMemberDto>(url).then(oneDtoOf(TeamMemberDto));
    },

    create(orgId: number, data: CreateTeamMemberDto) {
        const url = `/organizations/${orgId}/team_members`;
        return api.post<TeamMemberDto>(url, data).then(oneDtoOf(TeamMemberDto));
    },

    update(orgId: number, id: number, data: UpdateTeamMemberDto) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.patch<TeamMemberDto>(url, data).then(oneDtoOf(TeamMemberDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.delete<TeamMemberDto>(url);
    },

    subscriptions: {
        connectable(teamMemberId: number, params?: FindAllQueryDto<SubscriptionDto>) {
            const url = `/team_members/${teamMemberId}/subscriptions/available`;
            return api.get<Paginated<SubscriptionDto>>(url, {params}).then(paginatedDtoOf(SubscriptionDto));
        },

        connect(teamMemberId: number, subscriptionId: number) {
            const url = `/team_members/${teamMemberId}/subscriptions/${subscriptionId}`;
            return api.post<TeamMemberSubscriptionDto>(url).then(oneDtoOf(TeamMemberSubscriptionDto));
        },

        disconnect(teamMemberId: number, subscriptionId: number) {
            const url = `/team_members/${teamMemberId}/subscriptions/${subscriptionId}`;
            return api.delete<TeamMemberSubscriptionDto>(url).then(oneDtoOf(TeamMemberSubscriptionDto));
        },
    },
};
