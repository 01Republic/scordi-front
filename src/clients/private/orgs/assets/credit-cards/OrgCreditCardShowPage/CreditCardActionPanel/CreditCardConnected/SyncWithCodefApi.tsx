import React, {memo} from 'react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';
import {NewSyncWithCodefApi} from './NewSyncWithCodefApi';

interface SyncWithCodefApiProps {
    //
}

export const SyncWithCodefApi = memo((props: SyncWithCodefApiProps) => {
    const {} = props;
    const {result, isLoading, reload} = useCodefCardsOfCreditCardShow();
    const codefCard: CodefCardDto | undefined = result.items[0];

    if (codefCard) {
        return (
            <MakeSyncWithCodefAPI
                codefCard={codefCard}
                onStart={() => 1}
                onFinish={() => {
                    reload();
                }}
            />
        );
    } else {
        return (
            <NewSyncWithCodefApi
                onStart={() => 1}
                onFinish={() => {
                    reload();
                }}
            />
        );
    }
});
SyncWithCodefApi.displayName = 'SyncWithCodefApi';
