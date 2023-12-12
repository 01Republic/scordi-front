import {atom} from 'recoil';
import {BillingScheduleShallowDto as ScheduleDto, GetBillingSchedulesParams} from '^models/BillingSchedule/type';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^models/BillingHistory/type';

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
    resultAtom: atom<Record<string, BillingHistoryDto[]>>({
        key: 'billingList/Histories/ResultAtom',
        default: {},
    }),
};

// calendar useBillingSchedulesV3 에서 사용되는 Atom
export const billingListSchedulesAtom = {
    queryAtom: atom<GetBillingSchedulesParams>({
        key: 'billingList/Schedules/QueryAtom',
        default: {},
    }),
    resultAtom: atom<Record<string, ScheduleDto[]>>({
        key: 'billingList/Schedules/ResultAtom',
        default: {},
    }),
};
