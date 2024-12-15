import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {TypeCast} from '^types/utils/class-transformer';

// 파트너 벤더사 담당자
export class VendorManagerDto {
    id: number; // ID
    vendorCompanyId: number; // 파트너 벤더사 ID
    name: string; // 이름
    email: string | null; // 이메일
    phone: string | null; // 전화번호
    jobName: string | null; // 직책
    profileImgUrl: string | null; // 프로필이미지주소
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => VendorCompanyDto) vendorCompany?: VendorCompanyDto; // 파트너 벤더사
}
