import React, {memo} from 'react';
import {BillingHistoryContentPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryContentPanel';
import {useBillingHistoriesV3, useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';

export const BillingHistoryListTab = memo(function BillingHistoryListTab() {
    const {result} = useBillingHistoryListOfSubscription();

    return <BillingHistoryContentPanel billingHistories={result.items} />;
});
