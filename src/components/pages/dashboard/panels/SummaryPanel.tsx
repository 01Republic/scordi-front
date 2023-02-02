import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ContentPanel, ContentPanelTitle} from '^layouts/ContentLayout';
import {WithChildren} from '^types/global.type';
import {currencyFormat} from '^utils/number';
import {dashboardSummaryState} from '^atoms/calendarData.atom';

export const SummaryPanel = memo(() => {
    const summaryData = useRecoilValue(dashboardSummaryState);

    return (
        <ContentPanel>
            <ContentPanelTitle>Summary</ContentPanelTitle>

            <div className="flex gap-6 items-stretch flex-wrap justify-between">
                <SummaryItem label="active apps">181</SummaryItem>
                <SummaryItem label="spending apps">81</SummaryItem>
                <SummaryItem label="usage members">6</SummaryItem>
                <SummaryItem label="total spend">{currencyFormat(summaryData.total, 'US$', '%u%n')}</SummaryItem>
                <SummaryItem label="paid amount">268,153.98 원</SummaryItem>
                <SummaryItem label="pending amount">268,153.98 원</SummaryItem>
            </div>
        </ContentPanel>
    );
});

interface SummaryItemProps {
    label: string;
}

const SummaryItem = memo((props: SummaryItemProps & WithChildren) => {
    const {label, children} = props;

    return (
        <div>
            <p className="text-gray-400 text-xs mb-3 capitalize">{label}</p>
            <div className="text-2xl mb-3">{children}</div>
        </div>
    );
});
