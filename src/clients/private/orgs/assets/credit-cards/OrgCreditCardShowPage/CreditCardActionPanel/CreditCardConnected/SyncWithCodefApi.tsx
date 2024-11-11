import React, {memo} from 'react';
import {pick} from '^types/utils/one-of-list.type';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';

export const SyncWithCodefApi = memo(() => {
    const {result} = useCodefCardsOfCreditCardShow();
    const currentCodefCard = pick(result.items[0]);

    // creditCard.isManuallyCreated?
    if (!currentCodefCard) {
        return <NewSyncWithCodefApi />;
    } else {
        return <MakeSyncWithCodefAPI />;
    }
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
