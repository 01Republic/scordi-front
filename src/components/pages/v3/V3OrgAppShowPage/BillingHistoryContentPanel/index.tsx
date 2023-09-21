import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryListView} from '^v3/share/BillingHistoryListView';
import {BillingHistorySummary} from '^v3/share/BillingHistoryListView/BillingHistorySummary';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {BillingHistoryDto} from '^types/billing.type';

interface BillingHistoryContentPanelProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistoryContentPanel = memo((props: BillingHistoryContentPanelProps) => {
    const {billingHistories} = props;

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <BillingHistorySummary billingHistories={billingHistories} />
                <BillingHistoryListView billingHistories={billingHistories} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
