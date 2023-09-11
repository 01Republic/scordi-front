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
                <SummaryItem label="active apps">
                    {!!summaryData.activeSubscriptions ? summaryData.activeSubscriptions.length : 0}
                </SummaryItem>
                <SummaryItem label="spending apps">
                    {!!summaryData.spendingSubscriptions ? summaryData.spendingSubscriptions.length : 0}
                </SummaryItem>
                <SummaryItem label="usage members">
                    {summaryData.memberships ? summaryData.memberships.length : 0}
                </SummaryItem>
                <SummaryItem label="total spend">{currencyFormat(summaryData.total, 'USD', '%n %u')}</SummaryItem>
                <SummaryItem label="paid amount">
                    {currencyFormat(summaryData.didPayAmount, 'USD', '%n %u')}
                </SummaryItem>
                <SummaryItem label="pending amount">
                    {currencyFormat(summaryData.willPayAmount, 'USD', '%n %u')}
                </SummaryItem>
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
