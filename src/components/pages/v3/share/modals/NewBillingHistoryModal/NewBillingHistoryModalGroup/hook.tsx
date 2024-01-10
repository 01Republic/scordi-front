import {useModal} from '^v3/share/modals';
import {
    detailInfoModalState,
    finishModalState,
    memoModalState,
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/NewBillingHistoryModal/atoms';

export const useNewBillingHistoryModal = () => {
    const payMethodModal = useModal(payMethodModalState);
    const payAmountModal = useModal(payAmountModalState);
    const detailInfoModal = useModal(detailInfoModalState);
    const finishModal = useModal(finishModalState);
    const memoModal = useModal(memoModalState);

    const modalGroupClose = () => {
        payMethodModal.setIsShow(false);
        payAmountModal.setIsShow(false);
        detailInfoModal.setIsShow(false);
        finishModal.setIsShow(false);
        memoModal.setIsShow(false);
    };
    return {modalGroupClose};
};
