import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export enum TagGroup {
    Product = 'product',
    Team = 'team',
    User = 'user',
}

export type TagDto = {
    id: number; // 태그 ID
    name: string;
    group: TagGroup;
    isFeatured: boolean;
    parentTagId: number;
    parentTag: TagDto;
    depth: number;
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
};

export type FindAllTagQueryDto = FindAllQueryDto<TagDto> & {};

export type CreateTagByAdminDto = {
    name: string;
    group: TagGroup;
    parentTagId?: number;
    isFeatured?: boolean;
};

export type UpdateTagByAdminDto = Partial<CreateTagByAdminDto> & {};
