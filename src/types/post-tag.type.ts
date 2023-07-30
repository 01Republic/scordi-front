import {PostDto} from '^types/post.type';

export type PostTagDto = {
    id: number; // 태그 ID
    name: string; // 태그명
    posts?: PostDto[]; // 게시글 목록
};
