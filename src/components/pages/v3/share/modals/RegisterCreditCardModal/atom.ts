import {atom} from 'recoil';

export const addCreditCardModal = {
    isShowAtom: atom({
        key: 'v3/addCreditCardModal',
        default: false,
    }),
    popStateSyncKey: 'addCreditCardModal',
};
