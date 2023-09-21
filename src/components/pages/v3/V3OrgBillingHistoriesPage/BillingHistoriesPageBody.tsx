import React, {memo, useEffect} from 'react';
import {CalendarPanel} from './mobile/CalendarPanel';
import {BillingListPanel} from './mobile/BillingListPanel';
import {useRouter} from 'next/router';

export const BillingHistoriesPageBody = memo(() => {
    const router = useRouter();

    return (
        <>
            <CalendarPanel />
            <BillingListPanel />
        </>
    );
});
