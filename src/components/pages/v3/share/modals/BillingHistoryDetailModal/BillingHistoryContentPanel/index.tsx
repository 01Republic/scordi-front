import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryDto} from '^types/billing.type';
import {BillingHistorySummary} from '../BillingHistorySummary';
import {BillingHistoryListView} from '../BillingHistoryListView';

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
BillingHistoryContentPanel.displayName = 'BillingHistoryContentPanel';
