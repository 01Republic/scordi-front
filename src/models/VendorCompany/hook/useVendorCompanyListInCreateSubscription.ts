import {useVendorCompaniesV3} from '^models/VendorCompany/hook/useVendorCompaniesV3';
import {vendorCompanyListInCreateSubscriptionAtom} from '^models/VendorCompany/atom';

// 구독 수동 등록 / 파트너사 목록
export function useVendorCompanyListInCreateSubscription() {
    return useVendorCompaniesV3(vendorCompanyListInCreateSubscriptionAtom);
}
