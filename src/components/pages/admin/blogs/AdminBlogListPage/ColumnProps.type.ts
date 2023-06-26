import {FindAllPostByAdminDto, PostDto} from '^types/post.type';

export interface ColumnProps {
    post: PostDto;
    fetchData?: (params: FindAllPostByAdminDto) => any;
}
