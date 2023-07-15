import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export type PostDto = {
    id: number;
    title: string;
    content: string;
    thumbnailUrl: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[] | null;
    createdAt: string;
    updatedAt: string;
    publishAt: string | null;
    visitCount: number;
    likeCount: number;
    unlikeCount: number;
};

export type FindAllPostQueryDto = FindAllQueryDto<PostDto> & {
    isPublished?: boolean;
};
export type FindAllPostByAdminDto = FindAllQueryDto<PostDto> & {};

export type CreatePostByAdminDto = {
    title: string; // 제목
    content: string; // 본문
    seoTitle: string; // SEO 제목
    seoDescription: string; // SEO 설명
    seoKeywords?: string[]; // SEO 키워드
    thumbnailImage?: File; // 썸네일이미지
    publishAt?: Date; // 발행일시
};

export type UpdatePostByAdminDto = Partial<CreatePostByAdminDto> & {};
