import {atom} from 'recoil';

export const googleCodeAtom = atom<string | null>({
    key: 'googleCodeAtom',
    default: null,
});
