import {atom} from 'recoil';

export const appShowPageModal = {
    isShowAtom: atom({
        key: 'v3/appsPageModalIsShow',
        default: false,
    }),
    popStateSyncKey: 'appsPageModal',
};
