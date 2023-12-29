import {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals';
import {
    detailInfoModalState,
    finishModalState,
    memoModalState,
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms';
import {MemoModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/MemoModal';
import {PayMethodModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/PayMethodModal';
import {PayAmountModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/PayAmountModal';
import {DetailInfoModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/DetailInfoModal';
import {FinishModal} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/FinishModal';

export const AddBillingHistoryModalGroup = memo(() => {
    const payMethodModal = useModal(payMethodModalState);
    const payAmountModal = useModal(payAmountModalState);
    const detailInfoModal = useModal(detailInfoModalState);
    const finishModal = useModal(finishModalState);
    const memoModal = useModal(memoModalState);

    useEffect(() => {
        payMethodModal.isShow && payMethodModal.setIsShow(false);
        payAmountModal.isShow && payAmountModal.setIsShow(false);
        detailInfoModal.isShow && detailInfoModal.setIsShow(false);
        finishModal.isShow && finishModal.setIsShow(false);
        memoModal.isShow && memoModal.setIsShow(false);
    }, []);

    return (
        <>
            <PayMethodModal />
            <PayAmountModal />
            <DetailInfoModal />
            <FinishModal />
            <MemoModal />
        </>
    );
});
