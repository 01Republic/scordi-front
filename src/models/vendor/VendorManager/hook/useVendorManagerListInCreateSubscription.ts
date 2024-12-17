import {useVendorManagersV3} from '^models/vendor/VendorManager/hook/useVendorManagersV3';
import {vendorManagerListInCreateSubscriptionAtom} from '^models/vendor/VendorManager/atom';

// 구독 수동 등록 / 파트너사 담당자 목록
export function useVendorManagerListInCreateSubscription() {
    return useVendorManagersV3(vendorManagerListInCreateSubscriptionAtom);
}
