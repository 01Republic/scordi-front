import React, {memo} from 'react';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {InformationPanel} from './InformationPanel';
import {BillingHistoryContentPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryContentPanel';

export const AppShowPageBody = memo(() => {
    const {result} = useBillingHistoriesV3();

    return (
        <>
            <InformationPanel />
            <BillingHistoryContentPanel billingHistories={result.items} />
        </>
    );
});
