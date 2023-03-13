import {memo} from 'react';
import {HistoryTable} from './Histories/HistoryTable';
import {useApplication} from '^hooks/useApplications';
import {CurrentHistoryZone} from './Histories/CurrentHistoryZone';

export const TabContentForHistories = memo(() => {
    const app = useApplication();

    if (!app) return <></>;

    return (
        <>
            <CurrentHistoryZone application={app} />
            <HistoryTable application={app} />
        </>
    );
});
