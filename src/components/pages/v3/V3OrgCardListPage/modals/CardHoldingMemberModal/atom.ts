import {atom} from 'recoil';

export const inputCardHoldingMemberModal = {
    isShowAtom: atom({
        key: 'v3/inputCardHoldingMemberModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardHoldingMemberModal',
};
