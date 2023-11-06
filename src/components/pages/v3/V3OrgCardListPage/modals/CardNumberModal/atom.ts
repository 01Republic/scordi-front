import {atom} from 'recoil';

export const inputCardNumberModal = {
    isShowAtom: atom({
        key: 'v3/inputCardNumberModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardNumberModal',
};
