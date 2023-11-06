import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllPostQueryDto, PostDto, StaticPostDto} from '^types/post.type';

export const postApi = {
    index(params?: FindAllPostQueryDto) {
        const url = `/posts`;
        return api.get<Paginated<PostDto>>(url, {params});
    },

    recent() {
        const url = `/posts`;
        const params: FindAllPostQueryDto = {
            order: {id: 'DESC'},
            page: 1,
            itemsPerPage: 1,
        };
        return api.get<Paginated<PostDto>>(url, {params}).then((res) => {
            return res.data.items[0] || null;
        });
    },

    show(id: number) {
        const url = `/posts/${id}`;
        return api.get<PostDto>(url);
    },
};

export async function showStaticPost(id: number) {
    const url = `/posts/${id}`;
    return api.get<StaticPostDto>(url).then((res) => res.data);
}
