import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllPostQueryDto, PostDto} from '^types/post.type';

export const postApi = {
    index(params?: FindAllPostQueryDto) {
        const url = `/posts`;
        return api.get<Paginated<PostDto>>(url, {params});
    },

    show(id: number) {
        const url = `/posts/${id}`;
        return api.get<PostDto>(url);
    },
};
