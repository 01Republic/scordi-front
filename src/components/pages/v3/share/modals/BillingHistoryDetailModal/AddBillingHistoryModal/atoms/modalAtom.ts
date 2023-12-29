import {atom} from 'recoil';

// step1 결제 수단 선택 모달
export const payMethodModalState = {
    isShowAtom: atom({
        key: 'v3/payMethodModalState/IsShow',
        default: false,
    }),
    popStateSyncKey: 'payMethodModalState',
};

// step2 결제 금액 입력 모달
export const payAmountModalState = {
    isShowAtom: atom({
        key: 'v3/payAmountModalState/IsShow',
        default: false,
    }),
    popStateSyncKey: 'payAmountModalState',
};

// step3 상세 정보 입력 모달
export const detailInfoModalState = {
    isShowAtom: atom({
        key: 'v3/detailInfoModalState/IsShow',
        default: false,
    }),
    popStateSyncKey: 'detailInfoModalState',
};

// step4 완료 모달
export const finishModalState = {
    isShowAtom: atom({
        key: 'v3/finishModalState/IsShow',
        default: false,
    }),
    popStateSyncKey: 'finishModalState',
};

// step5 메모 모달
export const memoModalState = {
    isShowAtom: atom({
        key: 'v3/memoModalState/IsShow',
        default: false,
    }),
    popStateSyncKey: 'memoModalState',
};
