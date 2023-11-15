import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {PostDto} from '^models/Post/type';

export enum TagGroup {
    Product = 'PRODUCT',
    Team = 'TEAM',
    User = 'USER',
}

export class TagDto {
    id: number; // 태그 ID
    name: string;
    group: TagGroup;
    isFeatured: boolean;
    parentTagId: number;
    parentTag: TagDto;
    depth: number;
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
}

export type FindAllTagQueryDto = FindAllQueryDto<TagDto> & {};

export type CreateTagByAdminDto = {
    name: string;
    group: TagGroup;
    parentTagId?: number;
    isFeatured?: boolean;
};

export type UpdateTagByAdminDto = Partial<CreateTagByAdminDto> & {};

//Post Tag
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
