import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';

/** [Codef] 커넥티드 아이디 */
export class CodefConnectedIdentityDto {
    // ID
    id: number;

    // 조직 FK
    organizationId: number;

    // 커넥티드 아이디 값
    connectedId: string;

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => CodefAccountDto) accounts?: CodefAccountDto[]; // 계정 목록
}
