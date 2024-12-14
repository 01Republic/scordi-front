import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {VendorManagerDto} from '^models/VendorManager/type';

// 파트너 벤더사
export class VendorCompanyDto {
    id: number; // ID
    organizationId: number; // 조직 ID
    name: string; // 이름
    profileImgUrl: string | null; // 프로필이미지주소
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => VendorManagerDto) vendorManagers?: VendorManagerDto[]; // 파트너 벤더사 담당자
}
