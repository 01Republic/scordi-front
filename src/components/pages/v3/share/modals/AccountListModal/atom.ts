import {atom} from 'recoil';
import {ProductDto} from '^models/Product/type';

export const accountListModal = {
    isShowAtom: atom({
        key: 'v3/accountListModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'accountListModal',
};

// 계정관리 목록 (페이지/모달) 에서 어느 product 의 것인지 선택한 값입니다.
export const subjectProductOfAccountsInModalState = atom<ProductDto | null>({
    key: 'subjectProductOfAccountsInModalState',
    default: null,
});
