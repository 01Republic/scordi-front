import {atom} from 'recoil';
import {BillingScheduleShallowDto} from '^types/billing.type';

export const monthlyRemainAmountModal = {
    isShowAtom: atom({
        key: 'v3/monthlyRemainAmountModal/IsShow',
        default: false,
    }),
};

export const monthlyBillingScheduleAtom = atom<BillingScheduleShallowDto[]>({
    key: 'monthlyBillingScheduleAtom',
    default: [],
});
