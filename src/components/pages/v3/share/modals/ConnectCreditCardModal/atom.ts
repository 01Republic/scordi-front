import {atom} from 'recoil';

export const connectCreditCardModal = {
    isShowAtom: atom({
        key: 'v3/connectCreditCardModal',
        default: false,
    }),
    popStateSyncKey: 'connectCreditCardModal',
};
