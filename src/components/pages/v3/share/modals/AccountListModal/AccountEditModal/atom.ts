import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {AccountDto} from '^types/account.type';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {orgIdParamState} from '^atoms/common';
import {useState} from 'react';

export const accountEditModalAtom = {
    isShowAtom: atom({
        key: 'accountEditModalShowAtom',
        default: false,
    }),
    popStateSyncKey: 'accountEditModalAtom',
};

export const subjectAccountInModalState = atom<AccountDto | null>({
    key: 'subjectAccountInModalState',
    default: null,
});
