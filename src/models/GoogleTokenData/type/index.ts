import {TypeCast} from '^types/utils/class-transformer';

export class GoogleTokenDataDto {
    uid: number; // UID
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
    scope: string; // 허용 범위
    idToken: string; // ID 토큰
    tokenType: string; // 토큰 타임
    email: string; // 이메
    name: string; // 이름
    picture: string; // 사진
    locale: string | null; // 언어
    @TypeCast(() => Date) expireAt: Date; // 만료일
}
