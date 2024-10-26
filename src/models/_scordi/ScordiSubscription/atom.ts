import {atom} from 'recoil';
import {ScordiSubscriptionDto} from './type';

export const currentScordiSubscriptionAtom = atom<ScordiSubscriptionDto | null>({
    key: 'currentScordiSubscriptionAtom',
    default: null,
});

export const currentScordiSubscriptionIsLoadingAtom = atom({
    key: 'currentScordiSubscriptionIsLoadingAtom',
    default: false,
});

export const scordiSubscriptionScheduledListAtom = atom<ScordiSubscriptionDto[]>({
    key: 'scordiSubscriptionScheduledList/ResultAtom',
    default: [],
});

export const scordiSubscriptionIsScheduledListLoadingAtom = atom({
    key: 'scordiSubscriptionScheduledList/IsLoadingAtom',
    default: false,
});

export const scordiSubscriptionIsScheduledListQueryAtom = atom({
    key: 'scordiSubscriptionScheduledList/QueryAtom',
    default: NaN,
});
