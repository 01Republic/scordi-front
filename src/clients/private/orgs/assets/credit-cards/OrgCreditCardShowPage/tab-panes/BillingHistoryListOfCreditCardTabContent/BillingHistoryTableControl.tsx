import React, {memo} from 'react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';
import {MdRefresh} from 'react-icons/md';
import {useSubscriptionListOfCreditCard} from '^models/Subscription/hook';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';

interface BillingHistoryTableControlProps {
    //
}

export const BillingHistoryTableControl = memo((props: BillingHistoryTableControlProps) => {
    const {} = props;
    const {result} = useCodefCardsOfCreditCardShow();
    const codefCard: CodefCardDto | undefined = result.items[0];

    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandler />

            <div>
                <div className="flex items-center gap-2">
                    <SyncRecentBillingHistoryButton codefCard={codefCard} />
                </div>
            </div>
        </div>
    );
});
BillingHistoryTableControl.displayName = 'BillingHistoryTableControl';

interface SyncRecentBillingHistoryButtonProps {
    codefCard?: CodefCardDto;
}

export const SyncRecentBillingHistoryButton = memo((props: SyncRecentBillingHistoryButtonProps) => {
    const {codefCard} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadCodefCards} = useCodefCardsOfCreditCardShow();
    const {reload: reloadSubscriptions, isNotLoaded: subscriptionIsNotLoaded} = useSubscriptionListOfCreditCard();
    const {reload: reloadBillingHistories, isNotLoaded: billingHistoryIsNotLoaded} =
        useBillingHistoryListOfCreditCard();
    const {syncCardWithConfirm, isSyncRunning} = useCodefCardSync();

    const onFinish = () => {
        return Promise.allSettled([
            reloadCodefCards(),
            !subscriptionIsNotLoaded && reloadSubscriptions(),
            !billingHistoryIsNotLoaded && reloadBillingHistories(),
        ]);
    };

    const startSync = () => {
        if (codefCard) {
            syncCardWithConfirm(orgId, codefCard).then(onFinish);
        } else {
            toast('먼저 카드사를 연결해주세요');
        }
    };

    return (
        <button
            className={`btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-300 gap-2 ${
                isSyncRunning ? 'btn-disabled' : ''
            }`}
            onClick={startSync}
        >
            <MdRefresh fontSize={14} className={isSyncRunning ? 'animate-spin' : ''} />
            <span>최신내역 불러오기</span>
        </button>
    );
});
