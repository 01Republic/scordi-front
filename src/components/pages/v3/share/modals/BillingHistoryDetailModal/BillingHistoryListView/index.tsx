import {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {DayGroupedList} from './DayGroupedList';
import {BillingHistoryManager} from '^models/BillingHistory';

interface BillingHistoryListViewProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistoryListView = memo((props: BillingHistoryListViewProps) => {
    const {billingHistories} = props;
    const groupedHistories = BillingHistoryManager.init(billingHistories).validateToListing().groupByIssuedAt();

    return (
        <ul className="w-full text-left">
            {Object.entries(groupedHistories).map(([date, histories], i) => (
                <DayGroupedList key={i} date={new Date(date)} entries={histories} showTitle={true} />
            ))}
        </ul>
    );
});
