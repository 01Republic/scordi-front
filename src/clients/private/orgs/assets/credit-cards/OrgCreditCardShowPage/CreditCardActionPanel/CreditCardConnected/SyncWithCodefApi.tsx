import React, {memo} from 'react';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';
import {useIdParam} from '^atoms/common';

export const SyncWithCodefApi = memo(() => {
    const creditCardId = useIdParam('creditCardId');
    const {currentCodefCard} = useCodefCardsOfCreditCardShow2(creditCardId);
    console.log('currentCodefCard', currentCodefCard);

    // creditCard.isManuallyCreated?
    if (!currentCodefCard) {
        return <NewSyncWithCodefApi />;
    } else {
        return <MakeSyncWithCodefAPI />;
    }
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
