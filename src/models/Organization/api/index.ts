import {api} from '^api/api';
import {
    CreateOrganizationRequestDto,
    FindAllOrganizationQueryDto,
    OrganizationConnectStatusDto,
    OrganizationDto,
    SearchOrgQueryDto,
    UpdateOrganizationRequestDto,
} from '^models/Organization/type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {TeamMemberDto} from '^models/TeamMember';
import {plainToInstance} from 'class-transformer';

// export const postUserSession = (data: UserLoginRequestDto) => {
//     return api.post<JwtContainer>('/users/session', data)
// }
//
// export const getUserSession = () => {
//     return api.get<UserDto>('/users/session')
// }
//
// export const putUserSession = () => {
//     return api.put<JwtContainer>('/users/session')
// }
//
// export const postUser = (data: UserLoginRequestDto) => {
//     return api.post<UserDto>('/users', data)
// }

const NAMESPACE = 'organizations';

export const organizationApi = {
    index(params?: FindAllQueryDto<OrganizationDto>) {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<OrganizationDto>>(url, {params}).then(paginatedDtoOf(OrganizationDto));
    },

    show(id: number, params?: FindAllQueryDto<OrganizationDto>) {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<OrganizationDto>(url, {params}).then(oneDtoOf(OrganizationDto));
    },

    create(data: CreateOrganizationRequestDto) {
        const url = `/${NAMESPACE}`;
        return api.post<OrganizationDto>(url, data).then(oneDtoOf(OrganizationDto));
    },

    update(id: number, data: UpdateOrganizationRequestDto) {
        const url = `/${NAMESPACE}/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        return api.patch<OrganizationDto>(url, data, {headers}).then(oneDtoOf(OrganizationDto));
    },

    destroy(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<Omit<OrganizationDto, 'id'>>(url);
    },

    search(data: SearchOrgQueryDto) {
        return api.get<OrganizationDto[]>(`/${NAMESPACE}/search`, {
            params: data,
        });
    },
};

/**
 * ADMIN / [회원] Organization API
 */
export const organizationAdminApi = {
    /** Organization summary / connect status */
    summary(params?: FindAllQueryDto<OrganizationConnectStatusDto>) {
        const url = '/admin/organizations/summary/connect_status';
        return api
            .get<Paginated<OrganizationConnectStatusDto>>(url, {params})
            .then(paginatedDtoOf(OrganizationConnectStatusDto));
    },

    index(params?: FindAllOrganizationQueryDto) {
        const url = '/admin/organizations';
        return api.get<Paginated<OrganizationDto>>(url, {params}).then(paginatedDtoOf(OrganizationDto));
    },

    update(id: number, data: UpdateOrganizationRequestDto) {
        const url = `/admin/organizations/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        return api.patch<OrganizationDto>(url, data, {headers}).then(oneDtoOf(OrganizationDto));
    },

    // Organization Update CounterCache
    updateCounter(id?: number) {
        const url = `/admin/organizations/update/counters`;
        return api.patch<void>(url, {}, {params: {id}});
    },
};

export const organizationConnectGoogleWorkspaceApi = {
    // bulk create 의 경우 아직 paigniated response 를 준비하지 못했습니다.
    sync(id: number) {
        const url = `/organizations/${id}/connect/google-workspace/sync`;
        return api.get<TeamMemberDto[]>(url).then((res) => {
            res.data = plainToInstance(TeamMemberDto, res.data);
            return res;
        });
    },

    disconnect(id: number) {
        const url = `/organizations/${id}/connect/google-workspace/disconnect`;
        return api.patch<OrganizationDto>(url).then(oneDtoOf(OrganizationDto));
    },
};
