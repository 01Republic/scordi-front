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
import {FinishModal} from '^v3/share/modals/NewBillingHistoryModal/FinishModal';

interface NewBillingHistoryModalGroupProps {
    onBillingHistoryCreated?: () => any;
}

export const NewBillingHistoryModalGroup = memo((props: NewBillingHistoryModalGroupProps) => {
    const payMethodModal = useModal(payMethodModalState);
    const payAmountModal = useModal(payAmountModalState);
    const detailInfoModal = useModal(detailInfoModalState);
    const finishModal = useModal(finishModalState);
    const memoModal = useModal(memoModalState);
    const {onBillingHistoryCreated} = props;

    useEffect(() => {
        payMethodModal.isShow && payMethodModal.setIsShow(false);
        payAmountModal.isShow && payAmountModal.setIsShow(false);
        detailInfoModal.isShow && detailInfoModal.setIsShow(false);
        finishModal.isShow && finishModal.setIsShow(false);
        memoModal.isShow && memoModal.setIsShow(false);
    }, []);

    return (
        <>
            {payMethodModal.isShow && <PayMethodModal />}
            <PayAmountModal onSubmit={onBillingHistoryCreated} />
            {/*지금 당장은 안써서 가려놨지만, 다시 살리게 될 컴포넌트이니까 지우지는 마세요.*/}
            {/*<DetailInfoModal />*/}
            <FinishModal />
            <MemoModal />
        </>
    );
});
