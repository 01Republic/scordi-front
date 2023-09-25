import {atom} from 'recoil';

export const accountCreateModalAtom = {
    isShowAtom: atom({
        key: 'accountCreateModalShowAtom',
        default: false,
    }),
    popStateSyncKey: 'accountCreateModal',
};
