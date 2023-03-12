import {memo} from 'react';
import {HistoryTable} from './Histories/HistoryTable';
import {useApplication} from '^hooks/useApplications';
import {CurrentHistoryZone} from './Histories/CurrentHistoryZone';
import {mockSyncHistoryList as syncHistories} from '^types/applicationSyncHistory.type';

export const TabContentForHistories = memo(() => {
    const app = useApplication();

    if (!app) return <></>;

    return (
        <>
            <CurrentHistoryZone application={app} history={syncHistories[0]} />
            <HistoryTable application={app} />
        </>
    );
});
