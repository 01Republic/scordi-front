import {atom} from 'recoil';

export const appShowDetailModal = {
    isShowAtom: atom({
        key: 'v3/appsDetailModalIsShow',
        default: false,
    }),
    popStateSyncKey: 'appsPageDetailModal',
};
