import {memo} from 'react';
import {ContentPanel, ContentPanelTitle} from '^layouts/ContentLayout';

export const MonthlyTrend = memo(() => {
    return (
        <ContentPanel>
            <ContentPanelTitle>Monthly Spend Trend</ContentPanelTitle>
        </ContentPanel>
    );
});
