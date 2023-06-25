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
        if (data.seoKeywords) {
            console.log(data.seoKeywords);
        }
        return api.post<PostDto>(url, data, {headers});
    },

    update(id: number, data: UpdatePostByAdminDto) {
        const url = `/admin/posts/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        if (data.seoKeywords) {
            console.log(data.seoKeywords);
            // @ts-ignore
            body.seoKeywords = data.seoKeywords.join(',');
        }
        return api.patch<PostDto>(url, body, {headers});
    },

    destroy(id: number) {
        const url = `/admin/posts/${id}`;
        return api.delete<PostDto>(url);
    },
};
