import {atom} from 'recoil';
import {BillingHistoryDto} from '^types/billing.type';

export const monthlyPaidAmountModal = {
    isShowAtom: atom({
        key: 'v3/monthlyPaidAmountModal/IsShow',
        default: false,
    }),
};

export const monthlyBillingHistoryAtom = atom<BillingHistoryDto[]>({
    key: 'monthlyBillingHistoryAtom',
    default: [],
});
