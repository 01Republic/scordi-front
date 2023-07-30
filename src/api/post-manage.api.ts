import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {CreatePostByAdminDto, FindAllPostByAdminDto, PostDto, UpdatePostByAdminDto} from '^types/post.type';
import {CreatePostTagByAdminDto, FindAllPostTagQueryDto, PostTagDto} from '^types/post-tag.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {
    CreatePostAuthorByAdminDto,
    FindAllPostAuthorQueryDto,
    PostAuthorDto,
    UpdatePostAuthorByAdminDto,
} from '^types/post-author.type';

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
        // @ts-ignore
        if (data.tagNames) body.tagNames = data.tagNames.join(',');
        // @ts-ignore
        if (data.authorIds) body.authorIds = data.authorIds.join(',');
        return api.post<PostDto>(url, body, {headers});
    },

    update(id: number, data: UpdatePostByAdminDto) {
        const url = `/admin/posts/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.seoKeywords) body.seoKeywords = data.seoKeywords.join(',');
        // @ts-ignore
        if (data.tagNames) body.tagNames = data.tagNames.join(',');
        // @ts-ignore
        if (data.authorIds) body.authorIds = data.authorIds.join(',');
        return api.patch<PostDto>(url, body, {headers});
    },

    destroy(id: number) {
        const url = `/admin/posts/${id}`;
        return api.delete<PostDto>(url);
    },
};

export const postTagManageApi = {
    index(params?: FindAllPostTagQueryDto) {
        const url = `/admin/post-tags`;
        return api.get<PostTagDto[]>(url, {params});
    },

    create(data: CreatePostTagByAdminDto) {
        const url = `/admin/post-tags`;
        const body = {...data};
        return api.post<PostTagDto>(url, body);
    },
};

export const postAuthorManageApi = {
    index(params?: FindAllPostAuthorQueryDto) {
        const url = '/admin/post-authors';
        return api.get<PostAuthorDto[]>(url, {params});
    },

    create(data: CreatePostAuthorByAdminDto) {
        const url = `/admin/post-authors`;
        const body = {...data};
        return api.post<PostAuthorDto>(url, body);
    },

    update(id: number, data: UpdatePostAuthorByAdminDto) {
        const url = `/admin/post-authors/${id}`;
        const body = {...data};
        return api.patch<PostAuthorDto>(url, body);
    },
};
