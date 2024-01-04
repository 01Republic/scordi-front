import React, {memo} from 'react';
import {ModalButton} from '^v3/share/ModalButton';
import {useRecoilValue} from 'recoil';
import {
    createBillingHistoryAtom,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useToast} from '^hooks/useToast';
import {useModal} from '^v3/share/modals';

export const CTAButton = memo(() => {
    const createBillingHistory = useRecoilValue(createBillingHistoryAtom);
    const {open: openPayAmountModal} = useModal(payAmountModalState);
    const {toast} = useToast();

    const onClick = () => {
        if (!createBillingHistory.creditCardId) {
            toast.error('결제한 카드를 선택해주세요');
            return;
        }

        if (!createBillingHistory.paidAt) {
            toast.error('결제 일시를 확인해주세요');
            return;
        }

        openPayAmountModal();
    };

    return <ModalButton onClick={onClick} />;
});
