import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';

export const SyncWithCodefApi = memo(() => {
    const {result} = useCodefCardsOfCreditCardShow();
    const currentCodefCard: CodefCardDto | undefined = result.items[0];

    if (currentCodefCard) {
        return <MakeSyncWithCodefAPI />;
    } else {
        return <NewSyncWithCodefApi />;
    }
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
