import {atom} from 'recoil';
import {firstDayOfMonth, monthAfter, monthBefore} from '^utils/dateTime';
import {BillingHistoryDto, BillingScheduleShallowDto as ScheduleDto} from '^types/billing.type';

// [전방탐색] 조회 시작일
export const billingListStartDateAtom = atom({
    key: 'BillingListStartDateAtom',
    default: monthBefore(1, firstDayOfMonth()),
});

// [후방탐색] 조회 종료일
export const billingListEndDateAtom = atom({
    key: 'BillingListEndDateAtom',
    default: monthAfter(1, firstDayOfMonth()),
});

export type BillingListItemDto = BillingHistoryDto | ScheduleDto;

export const billingListGroupByDateAtom = atom<Record<string, BillingListItemDto[]>>({
    key: 'billingListGroupByDateAtom',
    default: {},
});
