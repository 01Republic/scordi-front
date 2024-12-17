import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllVendorManagersQueryDto, VendorManagerDto} from '^models/vendor/VendorManager/type';

// 구독 수동 등록 / 파트너사 담당자 목록
export const vendorManagerListInCreateSubscriptionAtom = pagedResourceAtom<
    VendorManagerDto,
    FindAllVendorManagersQueryDto
>({
    key: 'vendorManagerListInCreateSubscriptionAtom',
});
