import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistorySummary} from '../BillingHistorySummary';
import {BillingHistoryListView} from '../BillingHistoryListView';
import {BillingHistoryDto} from '^models/BillingHistory/type';

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
