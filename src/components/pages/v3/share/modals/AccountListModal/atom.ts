import {atom} from 'recoil';
import {ProductDto} from '^types/product.type';

export const accountListModal = {
    isShowAtom: atom({
        key: 'v3/accountListModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'accountListModal',
};

export const subjectProductOfAccountsInModalState = atom<ProductDto | null>({
    key: 'subjectProductOfAccountsInModalState',
    default: null,
});
