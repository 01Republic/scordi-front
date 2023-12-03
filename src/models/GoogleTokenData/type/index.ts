import {TypeCast} from '^types/utils/class-transformer';

export class GoogleTokenDataDto {
    uid: number; // UID
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
    scope: string; // 허용 범위
    @TypeCast(() => Date) expiryDate: Date; // 만료일
}
