import {TypeCast} from '^types/utils/class-transformer';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';

// 파트너 벤더사와 구독의 연결
export class VendorContractDto {
    id: number; // ID
    vendorCompanyId: number; // 파트너 벤더사 ID
    vendorManagerId: number | null; // 파트너 벤더사 담당자 ID
    subscriptionId: number; // 구독 ID
    memo: string | null; // 비고
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => VendorCompanyDto) vendorCompany?: VendorCompanyDto; // 파트너 벤더사
    @TypeCast(() => VendorManagerDto) vendorManager?: VendorManagerDto; // 파트너 벤더사 담당자
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독
}
