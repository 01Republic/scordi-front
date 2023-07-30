import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {PostTagDto} from '^types/post-tag.type';
import {PostAuthorDto} from '^types/post-author.type';

export type PostDto = {
    id: number; // 게시글 ID
    title: string; // 제목
    content: string; // 본문
    thumbnailUrl: string; // 썸네일이미지 주소
    seoTitle: string; // SEO 제목
    seoDescription: string; // SEO 설명
    seoKeywords: string[] | null; // SEO 키워드
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    publishAt: string | null; // 발행일시
    visitCount: number; // 조회수
    likeCount: number; // 좋아요수
    unlikeCount: number; // 싫어요수
    tags: PostTagDto[]; // Tag 리스트
    authors: PostAuthorDto[]; // 저자 리스트
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
