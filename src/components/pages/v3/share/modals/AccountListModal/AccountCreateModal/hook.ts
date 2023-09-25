import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals/useModal';
import {subjectProductOfAccountsInModalState} from '../atom';
import {accountCreateModalAtom} from './atom';

export const useAccountCreateModal = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {open, close, ...res} = useModal(accountCreateModalAtom);
    const product = useRecoilValue(subjectProductOfAccountsInModalState);

    const show = () => {
        open();
    };

    const hide = () => {
        close();
    };

    const data = {
        organizationId,
        product,
    };

    return {data, show, hide, ...res};
};
