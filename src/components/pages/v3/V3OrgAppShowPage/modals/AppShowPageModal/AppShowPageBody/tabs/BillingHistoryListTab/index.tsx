import React, {memo} from 'react';
import {BillingHistoryContentPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryContentPanel';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';

export const BillingHistoryListTab = memo(function BillingHistoryListTab() {
    const {result} = useBillingHistoriesV3();

    return <BillingHistoryContentPanel billingHistories={result.items} />;
});
