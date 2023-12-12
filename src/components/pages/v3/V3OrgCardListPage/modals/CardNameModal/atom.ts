import {atom} from 'recoil';

export const inputCardNameModal = {
    isShowAtom: atom({
        key: 'v3/inputCardNameModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardNameModal',
};
