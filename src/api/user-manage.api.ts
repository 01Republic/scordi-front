import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllUserByAdminDto, UserDto} from '^types/user.type';

export const userManageApi = {
    index(params?: FindAllUserByAdminDto) {
        const url = `/admin/users`;
        return api.get<Paginated<UserDto>>(url, {params});
    },

    show(id: number) {
        const url = `/admin/users/${id}`;
        return api.get<UserDto>(url);
    },
};
