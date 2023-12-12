import {api} from '^api/api';
import {
    CreateOrganizationRequestDto,
    OrganizationDto,
    SearchOrgQueryDto,
    UpdateOrganizationRequestDto,
} from '^models/Organization/type';
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
