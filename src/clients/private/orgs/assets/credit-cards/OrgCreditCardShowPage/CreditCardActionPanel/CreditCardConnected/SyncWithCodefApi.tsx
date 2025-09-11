import React, {memo} from 'react';
import {useIdParam} from '^atoms/common';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';
import {RenewSyncWithCodefApi} from './RenewSyncWithCodefApi';

export const SyncWithCodefApi = memo(() => {
    const creditCardId = useIdParam('creditCardId');
    const {currentCodefCard, refetch, isFetching} = useCodefCardsOfCreditCardShow2(creditCardId);
    console.log('SyncWithCodefApi.currentCodefCard', currentCodefCard);

    // creditCard.isManuallyCreated?

    if (!currentCodefCard || !currentCodefCard.account?.connectedIdentityId)
        return <NewSyncWithCodefApi reload={refetch} isLoading={isFetching} />;

    const errorData = currentCodefCard.account?.errorData;
    if (errorData)
        return <RenewSyncWithCodefApi currentCodefCard={currentCodefCard} reload={refetch} isLoading={isFetching} />;

    return <MakeSyncWithCodefAPI notificationType="payment" />;
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
