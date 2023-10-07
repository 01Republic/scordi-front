import {api} from './api';
import {
    CreateOrganizationRequestDto,
    OrganizationDto,
    SearchOrgQueryDto,
    UpdateOrganizationRequestDto,
} from '^types/organization.type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';

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
export const searchOrganizations = (data: SearchOrgQueryDto) => {
    return api.get<OrganizationDto[]>('/organizations/search', {
        params: data,
    });
};

export const getOrganization = (id: number) => {
    return api.get<OrganizationDto>(`/organizations/${id}`).then(oneDtoOf(OrganizationDto));
};

export const createOrganization = (data: CreateOrganizationRequestDto) => {
    return api.post<OrganizationDto>('/organizations', data).then(oneDtoOf(OrganizationDto));
};

export const updateOrganization = (id: number, data: UpdateOrganizationRequestDto) => {
    return api
        .patch<OrganizationDto>(`/organizations/${id}`, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(oneDtoOf(OrganizationDto));
};

export const destroyOrganization = (id: number) => {
    return api.delete<Omit<OrganizationDto, 'id'>>(`/organizations/${id}`);
};

export const organizationApi = {
    index(params?: FindAllQueryDto<OrganizationDto>) {
        const url = `/organizations`;
        return api.get<Paginated<OrganizationDto>>(url, {params}).then(paginatedDtoOf(OrganizationDto));
    },

    show(id: number) {
        const url = `/organizations/${id}`;
        return api.get<OrganizationDto>(url).then(oneDtoOf(OrganizationDto));
    },

    create(data: CreateOrganizationRequestDto) {
        const url = `/organizations`;
        return api.post<OrganizationDto>(url, data).then(oneDtoOf(OrganizationDto));
    },

    update(id: number, data: UpdateOrganizationRequestDto) {
        const url = `/organizations/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        return api.patch<OrganizationDto>(url, data, {headers}).then(oneDtoOf(OrganizationDto));
    },

    destroy(id: number) {
        const url = `/organizations/${id}`;
        return api.delete<Omit<OrganizationDto, 'id'>>(url);
    },
};
