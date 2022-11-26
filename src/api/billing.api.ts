import {api} from "^api/api";
import {Paginated} from "^types/utils/paginated.dto";
import {BillingHistoryDto, BillingScheduleShallowDto, StartEndParams} from "^types/billing.type";

export const getBillingSchedules = (params: StartEndParams) => {
    return api.get<Paginated<BillingScheduleShallowDto>>(`/billing_schedules`, {params});
}

export const getAppsBillingSchedule = (id: number, params: StartEndParams) => {
    return api.get<Paginated<BillingScheduleShallowDto>>(`/applications/${id}/billing_schedules`, {params});
}

export const getBillingHistories = (params: StartEndParams) => {
    return api.get<Paginated<BillingHistoryDto>>(`/billing_histories`, {params});
}

export const getAppsBillingHistory = (id: number) => {
    return api.get<BillingHistoryDto>(`/billing_histories/${id}`);
}