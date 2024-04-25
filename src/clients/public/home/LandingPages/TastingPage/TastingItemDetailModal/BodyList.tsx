import React, {memo} from 'react';
import {EmailParsedTableGroupByDay} from '../mobile/EmailParsedTableGroupByDay';
import {groupByDate} from '^utils/dateTime';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface BodyListProps {
    billingHistories: BillingHistoryDto[];
}

export const BodyList = memo((props: BodyListProps) => {
    const {billingHistories} = props;
    const groupedHistories = groupByDate(billingHistories, (history) => {
        return new Date(history.issuedAt);
    });

    return (
        <ul className="w-full text-left">
            {Object.entries(groupedHistories).map(([date, histories], i) => (
                <EmailParsedTableGroupByDay key={i} date={new Date(date)} entries={histories} showTitle={true} />
            ))}
        </ul>
    );
});
