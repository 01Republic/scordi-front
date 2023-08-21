import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {PostTagDto} from '^types/post-tag.type';
import {PostAuthorDto} from '^types/post-author.type';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';

export type PostDto = {
    id: number; // 게시글 ID
    title: string; // 제목
    content: string; // 본문
    thumbnailUrl?: string | null; // 썸네일이미지 주소
    seoTitle: string; // SEO 제목
    seoDescription: string; // SEO 설명
    seoKeywords: string[] | null; // SEO 키워드
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    publishAt: string | null; // 발행일시
    visitCount: number; // 조회수
    likeCount: number; // 좋아요수
    unlikeCount: number; // 싫어요수
    prototypeId?: number | null;
    prototype?: ApplicationPrototypeDto | null;
    tags: PostTagDto[]; // Tag 리스트
    authors: PostAuthorDto[]; // 저자 리스트
};

export type FindAllPostQueryDto = FindAllQueryDto<PostDto> & {
    isPublished?: boolean;
    isPrototypePost?: boolean;
    tagIds?: number[];
    keyword?: string;
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
    tagNames?: string[] | null; // 태그명 목록
    authorIds?: number[] | null; // 작성자 ID 목록
    prototypeId?: number; // 프로토타입 ID
};

export type UpdatePostByAdminDto = Partial<CreatePostByAdminDto> & {};
