import {memo} from 'react';
import {useModal} from '^v3/share/modals';
import {
    detailInfoModalState,
    finishModalState,
    memoModalState,
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

export const useNewBillingHistoryModal = () => {
    const payMethodModal = useModal(payMethodModalState);
    const payAmountModal = useModal(payAmountModalState);
    const detailInfoModal = useModal(detailInfoModalState);
    const finishModal = useModal(finishModalState);
    const memoModal = useModal(memoModalState);
    const modalGroupClose = () => {
        payMethodModal.close();
        payAmountModal.close();
        detailInfoModal.close();
        finishModal.close();
        memoModal.close();
    };
    return {modalGroupClose};
};
