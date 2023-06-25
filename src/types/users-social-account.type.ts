import {UserDto} from '^types/user.type';

export type UsersSocialAccountDto = {
    id: number; // 아이디
    userId: number; // 회원ID
    provider: string; // 소셜로그인공급자
    // uid: string; // 소셜로그인 uid
    email: string; // 이메일
    name: string; // 이름
    profileImageUrl?: string | null; // 프로필이미지 URL
    createdAt: string; // 생성일시
    updatedAt: string; // 수정일시
    user?: UserDto; // 회원
};
