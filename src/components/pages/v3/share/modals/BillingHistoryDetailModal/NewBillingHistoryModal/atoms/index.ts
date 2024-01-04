import {atom} from 'recoil';

export * from './modalAtom';
export * from './createBillingHistoryAtom';

export const isDomesticState = atom({
    key: 'isDomesticState',
    default: true,
});

export const memoState = atom<string>({
    key: 'memoState',
    default: '',
});

// 메모만을 위한 billing history id
export const billingHistoryIdState = atom<number | null>({
    key: 'billingHistoryId',
    default: null,
});

export const abroadPayAmount = atom<number>({
    key: 'abroadPayAmount',
    default: 0,
});
