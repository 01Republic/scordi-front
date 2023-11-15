import {memo} from 'react';
import {DayGroupedList} from './DayGroupedList';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface BillingHistoryListViewProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistoryListView = memo((props: BillingHistoryListViewProps) => {
    const {billingHistories} = props;
    const groupedHistories = BillingHistoryManager.init(billingHistories)
        .validateToListing()
        .uniqByIdentity()
        .groupByIssuedAtYMD();

    return (
        <ul className="w-full text-left">
            {Object.entries(groupedHistories).map(([date, histories], i) => (
                <DayGroupedList key={i} date={new Date(date)} entries={histories} showTitle={true} />
            ))}
        </ul>
    );
});
