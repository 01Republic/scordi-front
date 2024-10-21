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
