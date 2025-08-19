import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class GoogleAdminDirectoryUserTokenDto {
    @Expose()
    clientId: string;

    @Expose()
    scopes: string[];

    @Expose()
    userKey: string;

    @Expose()
    anonymous: boolean;

    @Expose()
    displayText: string;

    @Expose()
    nativeApp: boolean;

    @Expose()
    kind: string;

    @Expose()
    etag: string;
}
