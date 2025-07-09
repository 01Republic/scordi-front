import {TypeCast} from '^types/utils/class-transformer';
import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class GoogleTokenDataDto {
    @Expose() id: number;
    @Expose() uid: number; // UID ?
    @Expose() accessToken: string; // 액세스 토큰
    @Expose() refreshToken: string; // 리프레시 토큰 ?
    @Expose() scope: string; // 허용 범위 ?
    @Expose() idToken: string; // ID 토큰 ?
    @Expose() tokenType: string; // 토큰 타입 ?
    @Expose() email: string; // 이메일
    @Expose() name: string; // 이름
    @Expose() picture: string; // 사진
    @Expose() locale: string | null; // 언어

    @Expose()
    @TypeCast(() => Date)
    expireAt: Date; // 만료일 ?

    @Expose()
    @TypeCast(() => Date)
    createdAt: Date;

    @Expose()
    @TypeCast(() => Date)
    updatedAt: Date;
}

export class GoogleTokenDataSecureDto {
    id: number;
    email: string; // 이메일
    name: string; // 이름
    picture: string | null; // 사진
    locale: string | null; // 언어

    @TypeCast(() => Date) expireAt: Date;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    get isExpired() {
        return this.expireAt.getTime() < Date.now();
    }
}

@Exclude()
export class GoogleTokenDataResponseDto extends GoogleTokenDataDto {
    @Expose() id: number;
    @Expose() email: string; // 이메일
    @Expose() name: string; // 이름
    @Expose() picture: string; // 사진
    @Expose() locale: string | null; // 언어

    @Expose()
    @TypeCast(() => Date)
    expireAt: Date; // 만료일

    // 이하 미노출

    @Exclude() uid: number; // UID ?
    @Exclude() accessToken: string; // 액세스 토큰 ?
    @Exclude() refreshToken: string; // 리프레시 토큰 ?
    @Exclude() scope: string; // 허용 범위 ?
    @Exclude() idToken: string; // ID 토큰 ?
    @Exclude() tokenType: string; // 토큰 타입 ?
}
