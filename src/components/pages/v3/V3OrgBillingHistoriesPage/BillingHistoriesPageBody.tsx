import React, {memo, useEffect} from 'react';
import {CalendarPanel} from './mobile/CalendarPanel';
import {BillingHistoryListPanel} from './mobile/BillingHistoryListPanel';
import {useRouter} from 'next/router';

export const BillingHistoriesPageBody = memo(() => {
    const router = useRouter();

    return (
        <>
            <CalendarPanel />
            <BillingHistoryListPanel />
        </>
    );
});
