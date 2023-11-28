import {atom} from 'recoil';

export const newAppModal = {
    isShowAtom: atom({
        key: 'v3/newAppModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'newAppModal',
};
