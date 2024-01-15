import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllUserByAdminDto, UserDto} from '^models/User/types';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

export const userManageApi = {
    index(params?: FindAllUserByAdminDto) {
        const url = `/admin/users`;
        return api.get<Paginated<UserDto>>(url, {params}).then(paginatedDtoOf(UserDto));
    },

    show(id: number) {
        const url = `/admin/users/${id}`;
        return api.get<UserDto>(url).then(oneDtoOf(UserDto));
    },

    destroy(id: number) {
        const url = `/admin/users/${id}`;
        return api.delete<UserDto>(url).then(oneDtoOf(UserDto));
    },
};
