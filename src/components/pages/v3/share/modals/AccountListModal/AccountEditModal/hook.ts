import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals/useModal';
import {AccountDto} from '^types/account.type';
import {accountEditModalAtom, subjectAccountInModalState} from './atom';
import {subjectProductOfAccountsInModalState} from '../atom';

export const useAccountEditModal = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {open, close, ...res} = useModal(accountEditModalAtom);
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const [account, setAccount] = useRecoilState(subjectAccountInModalState);

    const show = (account: AccountDto) => {
        if (account) setAccount(account); // edit modal required
        open();
    };

    const hide = () => {
        setAccount(null);
        close();
    };

    const data = {
        organizationId,
        product,
        account,
    };

    return {data, show, hide, ...res};
};
