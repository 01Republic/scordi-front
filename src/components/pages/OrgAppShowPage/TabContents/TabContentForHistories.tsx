import {memo} from 'react';
import {HistoryTable} from './Histories/HistoryTable';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {CurrentHistoryZone} from './Histories/CurrentHistoryZone';

export const TabContentForHistories = memo(() => {
    const {currentApplication: app} = useCurrentSubscription();

    if (!app) return <></>;

    return (
        <>
            <CurrentHistoryZone application={app} />
            <HistoryTable application={app} />
        </>
    );
});
