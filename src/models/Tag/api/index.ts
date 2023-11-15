import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {CreateTagByAdminDto, FindAllTagQueryDto, TagDto, UpdateTagByAdminDto} from '^models/Tag/type';

const NAMESPACE = 'tags';

export const tagApi = {
    index(params?: FindAllTagQueryDto) {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<TagDto>>(url, {params});
    },

    show(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<TagDto>(url);
    },

    create(data: CreateTagByAdminDto) {
        const url = `/${NAMESPACE}`;
        const body = {...data};
        return api.post<TagDto>(url, body);
    },

    update(id: number, data: UpdateTagByAdminDto) {
        const url = `/${NAMESPACE}/${id}`;
        const body = {...data};
        return api.patch<TagDto>(url, body);
    },

    destroy(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<TagDto>(url);
    },
};
