import React, {memo} from 'react';
import {CalendarPanel} from './mobile/CalendarPanel';
import {BillingListPanel} from './mobile/BillingListPanel';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export const BillingHistoriesPageBody = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    if (!currentOrg) return <></>;

    return (
        <>
            <CalendarPanel />
            <BillingListPanel />
        </>
    );
});
