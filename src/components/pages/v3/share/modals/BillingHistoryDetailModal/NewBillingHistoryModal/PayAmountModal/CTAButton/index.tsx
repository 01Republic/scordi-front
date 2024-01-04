import {ModalButton} from '^v3/share/ModalButton';
import React, {memo} from 'react';
import {toast} from 'react-toastify';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
    billingHistoryIdState,
    createBillingHistoryAtom,
    finishModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';
import {useModal} from '^v3/share/modals';

export const CTAButton = memo(() => {
    const createBillingHistory = useRecoilValue(createBillingHistoryAtom);
    const appId = useRecoilValue(appIdState);
    const setBillingHistoryId = useSetRecoilState(billingHistoryIdState);
    const {open: OpenFinishModal} = useModal(finishModalState);

    const onClick = () => {
        if (!appId) return;

        const amount = createBillingHistory.payAmount.amount;
        if (!amount) {
            toast.error('결제한 금액을 입력해주세요');
            return;
        }

        const req = appBillingHistoryApi.createV2(appId, createBillingHistory);

        req.then((res) => {
            setBillingHistoryId(res.data.id);
            OpenFinishModal();
        });
    };

    return <ModalButton onClick={onClick} />;
});
