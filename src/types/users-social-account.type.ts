import {UserDto} from '^types/user.type';
import {TypeCast} from '^types/utils/class-transformer';

export class UsersSocialAccountDto {
    id: number; // 아이디
    userId: number; // 회원ID
    provider: string; // 소셜로그인공급자
    // uid: string; // 소셜로그인 uid
    email: string; // 이메일
    name: string; // 이름
    profileImageUrl?: string | null; // 프로필이미지 URL
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    // relations
    @TypeCast(() => UserDto) user?: UserDto; // 회원
}
