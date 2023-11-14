import {memo} from 'react';
import {HistoryTable} from './Histories/HistoryTable';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {CurrentHistoryZone} from './Histories/CurrentHistoryZone';

export const TabContentForHistories = memo(() => {
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <>
            <CurrentHistoryZone subscription={subscription} />
            <HistoryTable subscription={subscription} />
        </>
    );
});
