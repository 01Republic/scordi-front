import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    BillingHistoriesMonthlySumBySubscriptionDto,
    BillingHistoriesYearlySumBySubscriptionDto,
    BillingHistoryDto,
    BillingHistoryStatusDateRangeDto,
    CreateBillingHistoryRequestDto,
    CreateBillingHistoryStandAloneRequestDto,
    FindAllBillingHistoriesQueryDto,
    GetBillingHistoriesParams,
    UpdateBillingHistoryRequestDto,
} from '^models/BillingHistory/type';
import {UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';
import {UploadFileDto} from '^api/file.api';
import {AxiosProgressEvent} from 'axios';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {UpdateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/UpdateBillingHistoryByManual.request.dto';

export const billingHistoryApi = {
    index: (params: GetBillingHistoriesParams) => {
        const url = `/billing_histories`;
        return api.get<Paginated<BillingHistoryDto>>(url, {params}).then(paginatedDtoOf(BillingHistoryDto));
    },

    // 조직 내의 결제내역 조회 (상기 index 메소드를 대체하려고 만듦)
    indexOfOrg: (orgId: number, params: FindAllBillingHistoriesQueryDto) => {
        const url = `/organizations/${orgId}/billing_histories`;
        return api.get<Paginated<BillingHistoryDto>>(url, {params}).then(paginatedDtoOf(BillingHistoryDto));
    },

    show: (id: number) => {
        const url = `/billing_histories/${id}`;
        return api.get<BillingHistoryDto>(url).then(oneDtoOf(BillingHistoryDto));
    },

    create: (dto: CreateBillingHistoryStandAloneRequestDto) => {
        return api.post<BillingHistoryDto>(`/billing_histories`, dto).then(oneDtoOf(BillingHistoryDto));
    },

    // DEPRECATED => updateV2
    update: (id: number, dto: UpdateBillingHistoryRequestDto) => {
        const url = `/billing_histories/${id}`;
        return api.patch<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateV2: (id: number, dto: UpdateBillingHistoryRequestDtoV2) => {
        const url = `/billing_histories/v2/${id}`;
        return api.patch<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    destroy: (id: number) => {
        const url = `/billing_histories/${id}`;
        return api.delete<BillingHistoryDto>(url).then(oneDtoOf(BillingHistoryDto));
    },

    statusApi: {
        // 결제현황의 날짜범위 조회
        dateRange: (orgId: number, params?: GetBillingHistoriesParams) => {
            params ||= {};
            params.where ||= {};
            params.where.organizationId = orgId;
            const url = `/billing_histories/status/date-range`;
            return api.get(url, {params}).then(oneDtoOf(BillingHistoryStatusDateRangeDto));
        },

        // 구독의 연간 합계 금액 조회
        yearlySum: (orgId: number) => {
            const params = {organizationId: orgId};
            const url = `/billing_histories/status/yearly-sum`;
            return api.get(url, {params}).then(listDtoOf(BillingHistoriesYearlySumBySubscriptionDto));
        },

        // 구독의 월간 합계 금액 조회
        monthlySum: (orgId: number, year: number) => {
            const params = {organizationId: orgId, year};
            const url = `/billing_histories/status/monthly-sum`;
            return api.get(url, {params}).then(listDtoOf(BillingHistoriesMonthlySumBySubscriptionDto));
        },
    },

    creditCardApi: {
        createByExcel: (orgId: number, creditCardId: number, file: FormData) => {
            const url = `/organizations/${orgId}/credit-cards/${creditCardId}/billing-histories/by-excel`;
            return api.post<void>(url, file);
        },
    },
};

export const appBillingHistoryApi = {
    index: (subscriptionId: number, params?: FindAllBillingHistoriesQueryDto) => {
        const url = `/subscriptions/${subscriptionId}/billing_histories`;
        return api.get<Paginated<BillingHistoryDto>>(url, {params}).then(paginatedDtoOf(BillingHistoryDto));
    },

    // 구독서비스의 결제내역 생성 *
    create: (subscriptionId: number, dto: CreateBillingHistoryRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/billing_histories`;
        return api.post<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    createV2: (subscriptionId: number, dto: CreateBillingHistoryRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/billing_histories/v2`;
        return api.post<BillingHistoryDto>(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateV2: (billingHistoryId: number, dto: UpdateBillingHistoryRequestDtoV2) => {
        const url = `/billing_histories/v2/${billingHistoryId}`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
};

export const subscriptionBillingHistoryApi = {
    create(subscriptionId: number) {
        const url = `/subscriptions/${subscriptionId}/billing_histories`;
        return api.post(url).then(oneDtoOf(BillingHistoryDto));
    },

    update(subscriptionId: number, id: number, dto: UpdateBillingHistoryRequestDto) {
        const url = `/subscriptions/${subscriptionId}/billing_histories/${id}`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    show(subscriptionId: number, id: number) {
        const url = `/subscriptions/${subscriptionId}/billing_histories/${id}`;
        return api.get(url).then(oneDtoOf(BillingHistoryDto));
    },

    destroy(subscriptionId: number, id: number) {
        const url = `/subscriptions/${subscriptionId}/billing_histories/${id}`;
        return api.delete(url).then(oneDtoOf(BillingHistoryDto));
    },

    createByManual: (subscriptionId: number, dto: CreateBillingHistoryByManualRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/billing_histories/by-manual`;
        return api.post(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateByManual: (subscriptionId: number, id: number, dto: UpdateBillingHistoryByManualRequestDto) => {
        const url = `/subscriptions/${subscriptionId}/billing_histories/${id}/by-manual`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
};

export const creditCardBillingHistoryApi = {
    create(orgId: number, id: number) {
        const url = `/organizations/${orgId}/credit-cards/${id}/billing-histories`;
        return api.post(url).then(oneDtoOf(BillingHistoryDto));
    },
    update(orgId: number, cardId: number, id: number, dto: UpdateBillingHistoryRequestDto) {
        const url = `/organizations/${orgId}/credit-cards/${cardId}/billing-histories/${id}`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
    show(orgId: number, cardId: number, id: number) {
        const url = `/organizations/${orgId}/credit-cards/${cardId}/billing-histories/${id}`;
        return api.get(url).then(oneDtoOf(BillingHistoryDto));
    },
    destroy(orgId: number, cardId: number, id: number) {
        const url = `/organizations/${orgId}/credit-cards/${cardId}/billing-histories/${id}`;
        return api.delete(url).then(oneDtoOf(BillingHistoryDto));
    },

    createByManual: (orgId: number, id: number, dto: CreateBillingHistoryByManualRequestDto) => {
        const url = `/organizations/${orgId}/credit-cards/${id}/billing-histories/by-manual`;
        return api.post(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateByManual: (orgId: number, cardId: number, id: number, dto: UpdateBillingHistoryByManualRequestDto) => {
        const url = `/organizations/${orgId}/credit-cards/${cardId}/billing-histories/${id}/by-manual`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
};

export const bankAccountBillingHistoryApi = {
    create(orgId: number, id: number) {
        const url = `/organizations/${orgId}/bank-accounts/${id}/billing-histories`;
        return api.post(url).then(oneDtoOf(BillingHistoryDto));
    },
    update(orgId: number, bankAccountId: number, id: number, dto: UpdateBillingHistoryRequestDto) {
        const url = `/organizations/${orgId}/bank-accounts/${bankAccountId}/billing-histories/${id}`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
    show(orgId: number, bankAccountId: number, id: number) {
        const url = `/organizations/${orgId}/bank-accounts/${bankAccountId}/billing-histories/${id}`;
        return api.get(url).then(oneDtoOf(BillingHistoryDto));
    },
    destroy(orgId: number, bankAccountId: number, id: number) {
        const url = `/organizations/${orgId}/bank-accounts/${bankAccountId}/billing-histories/${id}`;
        return api.delete(url).then(oneDtoOf(BillingHistoryDto));
    },

    createByManual: (orgId: number, id: number, dto: CreateBillingHistoryByManualRequestDto) => {
        const url = `/organizations/${orgId}/bank-accounts/${id}/billing-histories/by-manual`;
        return api.post(url, dto).then(oneDtoOf(BillingHistoryDto));
    },

    updateByManual: (orgId: number, bankAccountId: number, id: number, dto: UpdateBillingHistoryByManualRequestDto) => {
        const url = `/organizations/${orgId}/bank-accounts/${bankAccountId}/billing-histories/${id}/by-manual`;
        return api.patch(url, dto).then(oneDtoOf(BillingHistoryDto));
    },
};
