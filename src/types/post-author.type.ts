import {PostDto} from '^types/post.type';

export type PostAuthorDto = {
    id: number; // 작성자 ID
    name: string; // 이름
    profileImg: string; // 이미지 URL
    introduce: string; // 소개
    posts?: PostDto[]; // 게시글 목록
};
