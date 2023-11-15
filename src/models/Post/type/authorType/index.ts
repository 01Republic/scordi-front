import {PostDto} from '^models/Post/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export type PostAuthorDto = {
    id: number; // 작성자 ID
    name: string; // 이름
    profileImg: string; // 이미지 URL
    introduce: string; // 소개
    posts?: PostDto[]; // 게시글 목록
};

export type FindAllPostAuthorQueryDto = FindAllQueryDto<PostAuthorDto> & {
    name: string; // 이름
};

export type CreatePostAuthorByAdminDto = {
    name: string; // 태그명
    profileImg?: string; // 이미지 URL
    introduce?: string; // 소개
};

export type UpdatePostAuthorByAdminDto = Partial<CreatePostAuthorByAdminDto>;
