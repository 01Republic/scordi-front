import {memo} from 'react';
import {HistoryTable} from './Histories/HistoryTable';
import {useCurrentApplication} from '^hooks/useApplications';
import {CurrentHistoryZone} from './Histories/CurrentHistoryZone';

export const TabContentForHistories = memo(() => {
    const {currentApplication: app} = useCurrentApplication();

    if (!app) return <></>;

    return (
        <>
            <CurrentHistoryZone application={app} />
            <HistoryTable application={app} />
        </>
    );
});
