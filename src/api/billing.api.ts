import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    BillingHistoryDto,
    BillingScheduleShallowDto,
    CreateBillingHistoryRequestDto,
    StartEndParams,
} from '^types/billing.type';

export const getBillingSchedules = (params: StartEndParams) => {
    return api.get<Paginated<BillingScheduleShallowDto>>(`/billing_schedules`, {params});
};

export const getAppsBillingSchedule = (id: number, params: StartEndParams) => {
    return api.get<Paginated<BillingScheduleShallowDto>>(`/applications/${id}/billing_schedules`, {params});
};

export const getBillingHistories = (params: StartEndParams) => {
    return api.get<Paginated<BillingHistoryDto>>(`/billing_histories`, {params});
};

export const getAppsBillingHistory = (applicationId: number, params?: StartEndParams) => {
    return api.get<Paginated<BillingHistoryDto>>(`/applications/${applicationId}/billing_histories`, {params});
};

// 구독서비스 결제내역 생성 *
export function createAppsBillingHistory(applicationId: number, dto: CreateBillingHistoryRequestDto) {
    return api.post<BillingHistoryDto>(`/applications/${applicationId}/billing_histories`, dto);
}
