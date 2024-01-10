import {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals';
import {
    detailInfoModalState,
    finishModalState,
    memoModalState,
    payAmountModalState,
    payMethodModalState,
} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {MemoModal} from '^v3/share/modals/NewBillingHistoryModal/MemoModal';
import {PayMethodModal} from '^v3/share/modals/NewBillingHistoryModal/PayMethodModal';
import {PayAmountModal} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal';
import {DetailInfoModal} from '^v3/share/modals/NewBillingHistoryModal/DetailInfoModal';
import {FinishModal} from '^v3/share/modals/NewBillingHistoryModal/FinishModal';

interface Props {
    onClose?: () => any;
}

export const NewBillingHistoryModalGroup = memo((props: Props) => {
    const payMethodModal = useModal(payMethodModalState);
    const payAmountModal = useModal(payAmountModalState);
    const detailInfoModal = useModal(detailInfoModalState);
    const finishModal = useModal(finishModalState);
    const memoModal = useModal(memoModalState);
    const {onClose} = props;

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
            <FinishModal onClose={onClose} />
            <MemoModal />
        </>
    );
});
