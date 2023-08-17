import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {CreateTagByAdminDto, FindAllTagQueryDto, TagDto, UpdateTagByAdminDto} from '^types/tag.type';

export const tagApi = {
    index(params?: FindAllTagQueryDto) {
        const url = `/tags`;
        return api.get<Paginated<TagDto>>(url, {params});
    },

    show(id: number) {
        const url = `/tags/${id}`;
        return api.get<TagDto>(url);
    },

    create(data: CreateTagByAdminDto) {
        const url = `/tags`;
        const body = {...data};
        return api.post<TagDto>(url, body);
    },

    update(id: number, data: UpdateTagByAdminDto) {
        const url = `/tags/${id}`;
        const body = {...data};
        return api.patch<TagDto>(url, body);
    },

    destory(id: number) {
        const url = `/tags/${id}`;
        return api.delete<TagDto>(url);
    },
};
