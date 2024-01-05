import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {
    createBillingHistoryAtom,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useToast} from '^hooks/useToast';
import {useModal} from '^v3/share/modals';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';

export const CTAButton = memo(() => {
    const createBillingHistory = useRecoilValue(createBillingHistoryAtom);
    const {open: openPayAmountModal} = useModal(payAmountModalState);
    const {toast} = useToast();

    const creditCardId = createBillingHistory.creditCardId;
    const paidAt = createBillingHistory.paidAt;

    const onClick = debounce(() => {
        if (!creditCardId) {
            toast.error('결제한 카드를 선택해주세요');
            return;
        }

        if (!paidAt) {
            toast.error('결제 일시를 확인해주세요');
            return;
        }

        openPayAmountModal();
    }, 500);

    return (
        <NextButtonUI isActive={!!creditCardId && !!paidAt} onClick={() => onClick()}>
            다음
        </NextButtonUI>
    );
});
