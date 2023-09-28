import {atom} from 'recoil';

export const selectProductModalAtom = {
    isShowAtom: atom({
        key: 'selectProductModalAtom',
        default: false,
    }),
};
