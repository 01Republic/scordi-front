import {atom} from 'recoil';

export const newCardModalState = {
    isShowAtom: atom({
        key: 'v3/newCardModalState',
        default: false,
    }),
    popStateSyncKey: 'newCardModalState',
};
