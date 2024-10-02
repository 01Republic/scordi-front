import React, {memo} from 'react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';
import {MdRefresh} from 'react-icons/md';
import {useSubscriptionListOfCreditCard, useSubscriptionListOfInvoiceAccount} from '^models/Subscription/hook';
import {useBillingHistoryListOfCreditCard, useBillingHistoryListOfInvoiceAccount} from '^models/BillingHistory/hook';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {InvoiceAppDto} from '^models/InvoiceApp/type';

interface BillingHistoryTableControlProps {
    //
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {} = props;
    // const {result} = useBillingHistoryListOfInvoiceAccount();
    // const invoiceApp: InvoiceAppDto | undefined = result.items[0];

    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandler />

            <div>
                <div className="flex items-center gap-2">
                    <SyncRecentBillingHistoryButton />
                </div>
            </div>
        </div>
    );
});
BillingHistoryTableControl.displayName = 'BillingHistoryTableControl';

interface SyncRecentBillingHistoryButtonProps {
    // invoiceApp?: InvoiceAppDto;
}

export const SyncRecentBillingHistoryButton = memo((props: SyncRecentBillingHistoryButtonProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    // const {reload: reloadCodefCards} = useCodefCardsOfCreditCardShow();
    const {reload: reloadSubscriptions, isNotLoaded: subscriptionIsNotLoaded} = useSubscriptionListOfInvoiceAccount();
    const {reload: reloadBillingHistories, isNotLoaded: billingHistoryIsNotLoaded} =
        useBillingHistoryListOfInvoiceAccount();
    const {syncCardWithConfirm, isSyncRunning} = useCodefCardSync();

    const onFinish = () => {
        return Promise.allSettled([
            // reloadCodefCards(),
            !subscriptionIsNotLoaded && reloadSubscriptions(),
            !billingHistoryIsNotLoaded && reloadBillingHistories(),
        ]);
    };

    const startSync = () => {
        // if (invoiceApp) {
        //     // syncCardWithConfirm(orgId, invoiceApp).then(onFinish);
        // } else {
        //     toast('먼저 카드사를 연결해주세요');
        // }
    };

    return (
        <button className={`btn btn-sm btn-white gap-2 ${isSyncRunning ? 'btn-disabled' : ''}`} onClick={startSync}>
            <MdRefresh fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
            <span>최신내역 불러오기</span>
        </button>
    );
});
