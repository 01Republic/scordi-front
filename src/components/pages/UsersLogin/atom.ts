import {atom} from 'recoil';
import {localStorageEffect} from '^atoms/localStorageEffect';

export const googleAccessTokenAtom = atom<string | null>({
    key: 'googleAccessTokenAtom',
    default: null,
    effects: [localStorageEffect('accessToken')],
});
