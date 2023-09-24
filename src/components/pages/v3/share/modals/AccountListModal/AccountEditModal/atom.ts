import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {AccountDto} from '^types/account.type';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';

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

export const useAccountEditModal = () => {
    const {open, close, ...res} = useModal(accountEditModalAtom);
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const [account, setAccount] = useRecoilState(subjectAccountInModalState);

    const show = (account: AccountDto) => {
        setAccount(account);
        open();
    };

    const hide = () => {
        setAccount(null);
        close();
    };

    const data = {
        product,
        account,
    };

    return {data, show, hide, ...res};
};
