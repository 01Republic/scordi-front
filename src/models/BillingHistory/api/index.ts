import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    BillingHistoryDto,
    CreateBillingHistoryRequestDto,
    CreateBillingHistoryStandAloneRequestDto,
    GetBillingHistoriesParams,
    UpdateBillingHistoryRequestDto,
    UpdateBillingHistoryRequestDtoV2,
} from '^models/BillingHistory/type';
import {UpdateBillingHistoryRequestDtoV3} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';

const NAMESPACE = 'billing_histories';

export const billingHistoryApi = {
    index: (params: GetBillingHistoriesParams) => {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<BillingHistoryDto>>(url, {params}).then(paginatedDtoOf(BillingHistoryDto));
    },

    show: (id: number) => {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<BillingHistoryDto>(url).then(oneDtoOf(BillingHistoryDto));
    },

    create: (dto: CreateBillingHistoryStandAloneRequestDto) => {
        return api.post<BillingHistoryDto>(`/${NAMESPACE}`, dto).then(oneDtoOf(BillingHistoryDto));
    },

    update: (id: number, dto: UpdateBillingHistoryRequestDto) => {
        const url = `/${NAMESPACE}/${id}`;
        return api.patch<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
    //updateDtoV2에서 paidAt이 string인 것 때문에 생성
    updateV3: (id: number, dto: UpdateBillingHistoryRequestDtoV3) => {
        const url = `/${NAMESPACE}/v2/${id}`;
        return api.patch<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    destroy: (id: number) => {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<BillingHistoryDto>(url).then(oneDtoOf(BillingHistoryDto));
    },
};

export const appBillingHistoryApi = {
    index: (subscriptionId: number, params?: GetBillingHistoriesParams) => {
        const url = `/subscriptions/${subscriptionId}/${NAMESPACE}`;
        return api.get<Paginated<BillingHistoryDto>>(url, {params}).then(paginatedDtoOf(BillingHistoryDto));
    },

    // 구독서비스의 결제내역 생성 *
    create: (subscriptionId: number, dto: CreateBillingHistoryRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/${NAMESPACE}`;
        return api.post<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    createV2: (subscriptionId: number, dto: CreateBillingHistoryRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/${NAMESPACE}/v2`;
        return api.post<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateV2: (billingHistoryId: number, dto: UpdateBillingHistoryRequestDtoV2) => {
        const url = `/${NAMESPACE}/v2/${billingHistoryId}`;
        return api.patch<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
};

export const getBillingHistoriesAll = (params: GetBillingHistoriesParams) => {
    params.itemsPerPage = 1;
    return billingHistoryApi.index(params).then(async (res) => {
        params.itemsPerPage = res.data.pagination.totalItemCount;
        if (params.itemsPerPage === 0) return [];
        const result = await billingHistoryApi.index(params);
        return result.data.items;
    });
};
