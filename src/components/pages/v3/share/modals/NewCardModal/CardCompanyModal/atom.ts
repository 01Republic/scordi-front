import {atom} from 'recoil';

export const selectCardCompanyModal = {
    isShowAtom: atom({
        key: 'v3/selectCardCompanyModal',
        default: false,
    }),
    popStateSyncKey: 'selectCardCompanyModal',
};
