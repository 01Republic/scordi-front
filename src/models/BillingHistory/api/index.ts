import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    BillingHistoryDto,
    CreateBillingHistoryRequestDto,
    CreateBillingHistoryRequestDto2,
    CreateBillingHistoryStandAloneRequestDto,
    GetBillingHistoriesParams,
    UpdateBillingHistoryRequestDto,
} from '^types/billing.type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

export const getBillingHistories = (params: GetBillingHistoriesParams) => {
    return api
        .get<Paginated<BillingHistoryDto>>(`/billing_histories`, {params})
        .then(paginatedDtoOf(BillingHistoryDto));
};

export const getBillingHistoriesAll = (params: GetBillingHistoriesParams) => {
    params.itemsPerPage = 1;
    return getBillingHistories(params).then(async (res) => {
        params.itemsPerPage = res.data.pagination.totalItemCount;
        if (params.itemsPerPage === 0) return [];
        const result = await getBillingHistories(params);
        return result.data.items;
    });
};

export const getAppsBillingHistory = (subscriptionId: number, params?: GetBillingHistoriesParams) => {
    return api
        .get<Paginated<BillingHistoryDto>>(`/subscriptions/${subscriptionId}/billing_histories`, {params})
        .then(paginatedDtoOf(BillingHistoryDto));
};

export const getBillingHistory = (id: number) => {
    return api.get<BillingHistoryDto>(`/billing_histories/${id}`).then(oneDtoOf(BillingHistoryDto));
};

// 구독서비스의 결제내역 생성 *
export function createAppsBillingHistory(subscriptionId: number, dto: CreateBillingHistoryRequestDto) {
    return api
        .post<BillingHistoryDto>(`/subscriptions/${subscriptionId}/billing_histories`, dto)
        .then(oneDtoOf(BillingHistoryDto));
}

// 결제내역 생성을 통한 구독서비스 생성 *
export function createAppsByBillingHistory(dto: CreateBillingHistoryStandAloneRequestDto) {
    return api.post<BillingHistoryDto>(`/billing_histories`, dto).then(oneDtoOf(BillingHistoryDto));
}

export const updateBillingHistory = (id: number, dto: UpdateBillingHistoryRequestDto) => {
    return api.patch<BillingHistoryDto>(`/billing_histories/${id}`, dto).then(oneDtoOf(BillingHistoryDto));
};

const NAMESPACE = 'billing_histories';

export const billingHistoryApi = {
    create: (subscriptionId: number, dto: CreateBillingHistoryRequestDto2) => {
        return api.post<BillingHistoryDto>(`/${NAMESPACE}`, dto).then(oneDtoOf(BillingHistoryDto));
    },
};
