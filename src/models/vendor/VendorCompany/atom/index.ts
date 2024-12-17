import {pagedResourceAtom} from '^hooks/usePagedResource';
import {FindAllVendorCompaniesQueryDto, VendorCompanyDto} from '^models/vendor/VendorCompany/type';

// 구독 수동 등록 / 파트너사 목록
export const vendorCompanyListInCreateSubscriptionAtom = pagedResourceAtom<
    VendorCompanyDto,
    FindAllVendorCompaniesQueryDto
>({
    key: 'vendorCompanyListInCreateSubscriptionAtom',
});
