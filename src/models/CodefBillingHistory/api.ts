import {CodefBillingHistoryDto, FindAllCodefBillingHistoryAdminQueryDto} from '^models/CodefBillingHistory/type';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {BillingHistoryDto} from '^models/BillingHistory/type';

// 코드에프카드 - 유저 데이터 조회
export const codefBillingHistoriesApi = {
    // 가장 오래된 코드에프카드 단건 결제내역 조회
    index(orgId: number, codefCardId: number) {
        const url = `/organizations/${orgId}/codef-cards/${codefCardId}/codef-billing-histories/oldest`;
        return api.get(url).then(oneDtoOf(CodefBillingHistoryDto));
    },
};

export const codefBillingHistoriesAdminApi = {
    index(params: FindAllCodefBillingHistoryAdminQueryDto) {
        const url = `/admin/codef-billing-histories`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefBillingHistoryDto));
    },

    // 코드에프 결제내역으로 결제내역 수동 생성
    createBillingHistory(codefBillingHistoryId: number, productId: number) {
        const url = `/admin/codef-billing-histories/${codefBillingHistoryId}/billing-histories`;
        return api.post(url, {productId}).then(oneDtoOf(BillingHistoryDto));
    },
};
