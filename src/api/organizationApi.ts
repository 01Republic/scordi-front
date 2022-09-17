import {api} from "./api";
import {
    CreateOrganizationRequestDto,
    OrganizationDto,
    SearchOrgQueryDto,
    UpdateOrganizationRequestDto,
} from '^types/organizationTypes';

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
    return api.get<OrganizationDto>(`/organizations/${id}`);
};

export const createOrganization = (data: CreateOrganizationRequestDto) => {
    return api.post<OrganizationDto>('/organizations', data);
};

export const updateOrganization = (id: number, data: UpdateOrganizationRequestDto) => {
    return api.patch<OrganizationDto>(`/organizations/${id}`, data);
};

export const destroyOrganization = (id: number) => {
    return api.delete<Omit<OrganizationDto, 'id'>>(`/organizations/${id}`);
}
