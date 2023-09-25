import {atom} from 'recoil';
import {firstDayOfMonth, monthAfter, monthBefore} from '^utils/dateTime';

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
