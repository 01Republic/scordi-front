import {atom} from 'recoil';
import {
    BillingHistoryDto,
    BillingScheduleShallowDto as ScheduleDto,
    GetBillingHistoriesParams,
    GetBillingSchedulesParams,
} from '^types/billing.type';
import {Paginated} from '^types/utils/paginated.dto';

// [전방탐색] 조회 시작일
export const billingListStartDateAtom = atom<Date | null>({
    key: 'BillingListStartDateAtom',
    default: null,
});

// [후방탐색] 조회 종료일
export const billingListEndDateAtom = atom<Date | null>({
    key: 'BillingListEndDateAtom',
    default: null,
});

// calendar useBillingHistoriesV3 에서 사용되는 Query State
export const billingListHistoriesAtom = {
    queryAtom: atom<GetBillingHistoriesParams>({
        key: 'billingList/Histories/QueryAtom',
        default: {},
    }),
    resultAtom: atom<Paginated<BillingHistoryDto>>({
        key: 'billingList/Histories/ResultAtom',
        default: {
            items: [],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 1,
                currentPage: 1,
                itemsPerPage: 30,
            },
        },
    }),
};

// calendar useBillingSchedulesV3 에서 사용되는 Atom
export const billingListSchedulesAtom = {
    queryAtom: atom<GetBillingSchedulesParams>({
        key: 'billingList/Schedules/QueryAtom',
        default: {},
    }),
    resultAtom: atom<Paginated<ScheduleDto>>({
        key: 'billingList/Schedules/ResultAtom',
        default: {
            items: [],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 1,
                currentPage: 1,
                itemsPerPage: 30,
            },
        },
    }),
};
