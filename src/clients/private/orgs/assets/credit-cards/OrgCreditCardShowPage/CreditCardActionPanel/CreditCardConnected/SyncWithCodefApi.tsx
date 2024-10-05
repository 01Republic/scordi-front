import React, {memo} from 'react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';
import {useSubscriptionListOfCreditCard} from '^models/Subscription/hook';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';

interface SyncWithCodefApiProps {
    //
}

export const SyncWithCodefApi = memo((props: SyncWithCodefApiProps) => {
    const {} = props;
    const {reload: reloadCodefCards, result, isLoading} = useCodefCardsOfCreditCardShow();
    const {reload: reloadSubscriptions, isNotLoaded: subscriptionIsNotLoaded} = useSubscriptionListOfCreditCard();
    const {reload: reloadBillingHistories, isNotLoaded: billingHistoryIsNotLoaded} =
        useBillingHistoryListOfCreditCard();

    const codefCard: CodefCardDto | undefined = result.items[0];

    const onFinish = () => {
        return Promise.allSettled([
            reloadCodefCards(),
            !subscriptionIsNotLoaded && reloadSubscriptions(),
            !billingHistoryIsNotLoaded && reloadBillingHistories(),
        ]);
    };

    if (codefCard) {
        return <MakeSyncWithCodefAPI codefCard={codefCard} onFinish={onFinish} />;
    } else {
        return <NewSyncWithCodefApi onStart={() => 1} onFinish={onFinish} />;
    }
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
