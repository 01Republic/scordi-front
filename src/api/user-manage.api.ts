import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {UserDto} from '^types/user.type';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';

export const userManageApi = {
    index(params?: FindAllQueryDto<UserDto>) {
        const url = `/admin/users`;
        return api.get<Paginated<UserDto>>(url, {params});
    },

    show(id: number) {
        const url = `/admin/users/${id}`;
        return api.get<UserDto>(url);
    },
};
