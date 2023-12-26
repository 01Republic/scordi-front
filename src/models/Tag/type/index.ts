import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {PostDto} from '^models/Post/type';
import {TypeCast} from '^types/utils/class-transformer';

export enum TagGroup {
    User = 'USER',
    Team = 'TEAM',
    Product = 'PRODUCT',
    RecurringType = 'RECURRING_TYPE',
    BillingCycle = 'BILLING_CYCLE',
}

export class TagDto {
    id: number; // 태그 ID
    name: string; // 태그 이름
    group: TagGroup; // 태그 그룹
    parentTagId: number; // 상위 태그 ID
    isFeatured: boolean;
    @TypeCast(() => TagDto) parentTag?: TagDto; // 상위 태그
    depth: number; // 깊이
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
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
