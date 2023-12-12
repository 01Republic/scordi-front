import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {GoogleTokenDataDto} from '^models/GoogleTokenData/type';

export class GoogleSyncHistoryDto {
    id: number; // 아이디
    organizationId: number; // 조직 ID
    email: string;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto;
    @TypeCast(() => GoogleTokenDataDto) googleTokenData: GoogleTokenDataDto;
}
