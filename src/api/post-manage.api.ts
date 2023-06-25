import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {CreatePostByAdminDto, FindAllPostByAdminDto, PostDto, UpdatePostByAdminDto} from '^types/post.type';

export const postManageApi = {
    index(params?: FindAllPostByAdminDto) {
        const url = `/admin/posts`;
        return api.get<Paginated<PostDto>>(url, {params});
    },

    show(id: number) {
        const url = `/admin/posts/${id}`;
        return api.get<PostDto>(url);
    },

    create(data: CreatePostByAdminDto) {
        const url = `/admin/posts`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.seoKeywords) body.seoKeywords = data.seoKeywords.join(',');
        return api.post<PostDto>(url, body, {headers});
    },

    update(id: number, data: UpdatePostByAdminDto) {
        const url = `/admin/posts/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.seoKeywords) body.seoKeywords = data.seoKeywords.join(',');
        return api.patch<PostDto>(url, body, {headers});
    },

    destroy(id: number) {
        const url = `/admin/posts/${id}`;
        return api.delete<PostDto>(url);
    },
};
