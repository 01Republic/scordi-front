import {PostDto} from '^types/post.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export type PostTagDto = {
    id: number; // 태그 ID
    name: string; // 태그명
    posts?: PostDto[]; // 게시글 목록
};

export type FindAllPostTagQueryDto = FindAllQueryDto<PostTagDto> & {
    name: string; // 태그명
};

export type CreatePostTagByAdminDto = {
    name: string; // 태그명
};
