import {atom} from 'recoil';
import {AccountDto} from '^models/Account/types';

export const accountEditModalAtom = {
    isShowAtom: atom({
        key: 'accountEditModalShowAtom',
        default: false,
    }),
    popStateSyncKey: 'accountEditModal',
};

export const subjectAccountInModalState = atom<AccountDto | null>({
    key: 'subjectAccountInModalState',
    default: null,
});
