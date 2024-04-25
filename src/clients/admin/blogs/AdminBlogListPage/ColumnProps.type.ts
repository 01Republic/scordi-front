import {FindAllPostByAdminDto, PostDto} from '^models/Post/type';

export interface ColumnProps {
    post: PostDto;
    fetchData?: (params: FindAllPostByAdminDto) => any;
}
