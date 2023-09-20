import {atom} from 'recoil';

export const accountListModal = {
    isShowAtom: atom({
        key: 'v3/accountListModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'accountListModal',
};
