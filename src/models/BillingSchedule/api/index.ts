import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {paginatedDtoOf} from '^types/utils/response-of';
import {BillingScheduleShallowDto, GetBillingSchedulesParams} from '../type';

// [구독서비스] 결제 일정 API (BillingSchedule) / 결제 일정 조회 *
export const getBillingSchedules = (params: GetBillingSchedulesParams) => {
    return api
        .get<Paginated<BillingScheduleShallowDto>>(`/billing_schedules`, {params})
        .then(paginatedDtoOf(BillingScheduleShallowDto));
};

export const getBillingSchedulesAll = (params: GetBillingSchedulesParams) => {
    params.itemsPerPage = 1;
    return getBillingSchedules(params).then(async (res) => {
        params.itemsPerPage = res.data.pagination.totalItemCount;
        if (params.itemsPerPage === 0) return [];
        const result = await getBillingSchedules(params);
        return result.data.items;
    });
};

// [구독서비스] 결제 일정 API (BillingSchedule) / 개별 구독 서비스의 결제 일정 조회 *
export const getAppsBillingSchedule = (id: number, params: GetBillingSchedulesParams) => {
    return api.get<Paginated<BillingScheduleShallowDto>>(`/subscriptions/${id}/billing_schedules`, {params});
};
