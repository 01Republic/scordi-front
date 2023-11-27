import React, {memo} from 'react';
import {InformationPanel} from '^v3/V3OrgAppShowPage/InformationPanel';
import {BillingHistoryContentPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryContentPanel';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';

export const AppShowPageBody = memo(() => {
    const {result} = useBillingHistoriesV3();

    return (
        <>
            <InformationPanel />
            <BillingHistoryContentPanel billingHistories={result.items} />
        </>
    );
});
