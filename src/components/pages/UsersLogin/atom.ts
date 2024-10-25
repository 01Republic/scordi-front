import {atom} from 'recoil';
import {localStorageEffect} from '^atoms/localStorageEffect';

export const googleAccessTokenAtom = atom<string | null>({
    key: 'googleAccessTokenAtom',
    default: null,
});

export const googleButtonIsLoading = atom({
    key: 'googleButton/IsLoading',
    default: false,
});
