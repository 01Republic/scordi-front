import {atom} from 'recoil';

export const registerAliasModal = {
    isShowAtom: atom({
        key: 'v3/registerAliasModal',
        default: false,
    }),
    popStateSyncKey: 'registerAliasModal',
};
