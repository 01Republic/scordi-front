import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryListView} from '^v3/share/BillingHistoryListView';
import {BillingHistorySummary} from '^v3/share/BillingHistoryListView/BillingHistorySummary';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';

export const BillingHistoryContentPanel = memo(() => {
    const {result} = useBillingHistoriesV3();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <BillingHistorySummary billingHistories={result.items} />
                <BillingHistoryListView billingHistories={result.items} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
