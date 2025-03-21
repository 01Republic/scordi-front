import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {TeamDto, CreateTeamDto, UpdateTeamDto, FindAllTeamQueryDto} from '^models/Team/type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';

export const teamApi = {
    index(orgId: number, params?: FindAllTeamQueryDto) {
        const url = `/organizations/${orgId}/teams`;
        return api.get<Paginated<TeamDto>>(url, {params}).then(paginatedDtoOf(TeamDto));
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/teams/${id}`;
        return api.get<TeamDto>(url).then(oneDtoOf(TeamDto));
    },

    create(orgId: number, data: CreateTeamDto) {
        const url = `/organizations/${orgId}/teams`;
        return api.post<TeamDto>(url, data);
    },

    update(orgId: number, id: number, data: UpdateTeamDto) {
        const url = `/organizations/${orgId}/teams/${id}`;
        return api.patch<TeamDto>(url, data);
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/teams/${id}`;
        return api.delete<TeamDto>(url);
    },

    subscriptions: {
        // 팀의 구성원들이 연결되어있는 구독 목록 조회
        index(orgId: number, teamId: number, params?: FindAllSubscriptionsQuery) {
            const url = `/organizations/${orgId}/teams/${teamId}/subscriptions`;
            return api.get<Paginated<SubscriptionDto>>(url, {params}).then(paginatedDtoOf(SubscriptionDto));
        },
    },
};
