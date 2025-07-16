import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    TeamMemberDto,
    CreateTeamMemberDto,
    UpdateTeamMemberDto,
    FindAllTeamMemberQueryDto,
} from '^models/TeamMember/type';
import {SubscriptionSeatDto} from '^models/SubscriptionSeat/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {SubscriptionDto} from '^models/Subscription/types';
import {UploadFileDto} from '^api/file.api';
import {AxiosProgressEvent} from 'axios';
import {CreateGoogleAdminTeamMembersRequestDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';

// [유저] 팀 멤버 API
export const teamMemberApi = {
    // 팀 멤버 조회
    index(orgId: number, params?: FindAllTeamMemberQueryDto) {
        const url = `/organizations/${orgId}/team_members`;
        return api.get<Paginated<TeamMemberDto>>(url, {params}).then(paginatedDtoOf(TeamMemberDto));
    },

    // 팀 멤버 상세
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.get<TeamMemberDto>(url).then(oneDtoOf(TeamMemberDto));
    },

    // 팀 멤버 생성
    create(orgId: number, data: CreateTeamMemberDto) {
        const url = `/organizations/${orgId}/team_members`;
        return api.post<TeamMemberDto>(url, data).then(oneDtoOf(TeamMemberDto));
    },

    // 팀 멤버 생성 (엑셀로 대량등록)
    createByExcel(orgId: number, data: UploadFileDto, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
        const url = `/organizations/${orgId}/team_members/by-excel`;
        const headers = {'Content-Type': 'multipart/form-data'};
        return api.post<TeamMemberDto[]>(url, data, {headers, onUploadProgress}).then(listDtoOf(TeamMemberDto));
    },

    update(orgId: number, id: number, data: UpdateTeamMemberDto) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.patch<TeamMemberDto>(url, data).then(oneDtoOf(TeamMemberDto));
    },

    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team_members/${id}`;
        return api.delete<TeamMemberDto>(url);
    },

    isExist(orgId: number, where: FindAllQueryDto<TeamMemberDto>['where']): Promise<TeamMemberDto | undefined> {
        return this.index(orgId, {
            where: {...where, organizationId: orgId},
            itemsPerPage: 1,
        }).then(({data}) => data.items[0]);
    },

    subscriptions: {
        connectable(teamMemberId: number, params?: FindAllQueryDto<SubscriptionDto>) {
            const url = `/team_members/${teamMemberId}/subscriptions/available`;
            return api.get<Paginated<SubscriptionDto>>(url, {params}).then(paginatedDtoOf(SubscriptionDto));
        },

        connect(teamMemberId: number, subscriptionId: number) {
            const url = `/team_members/${teamMemberId}/subscriptions/${subscriptionId}`;
            return api.post<SubscriptionSeatDto>(url).then(oneDtoOf(SubscriptionSeatDto));
        },

        disconnect(teamMemberId: number, subscriptionId: number) {
            const url = `/team_members/${teamMemberId}/subscriptions/${subscriptionId}`;
            return api.delete<SubscriptionSeatDto>(url).then(oneDtoOf(SubscriptionSeatDto));
        },
    },
};

export const connectGoogleAdmin = {
    teamMembersApi: {
        // @deprecated integrationGoogleWorkspaceWorkspaceApi.create() 를 사용하세요.
        upsertByCode(orgId: number, dto: CreateGoogleAdminTeamMembersRequestDto) {
            const url = `/connect/organizations/${orgId}/google-admin/team-members/by-code`;
            return api.post<TeamMemberDto[]>(url, dto);
        },
    },
};
