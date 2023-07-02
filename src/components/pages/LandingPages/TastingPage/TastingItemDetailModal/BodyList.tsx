import React, {memo} from 'react';
import {GmailItem} from '^api/tasting.api';
import {groupByDate} from '../mobile/util/group-by-date';
import {EmailParsedTableGroupByDay} from '../mobile/EmailParsedTableGroupByDay';

interface BodyListProps {
    sortedItems: GmailItem[];
}

export const BodyList = memo((props: BodyListProps) => {
    const {sortedItems} = props;
    const groupedItems = groupByDate(sortedItems);

    return (
        <ul className="w-full text-left">
            {Object.entries(groupedItems).map(([date, items], i) => (
                <EmailParsedTableGroupByDay key={i} date={new Date(date)} items={items} showTitle={true} />
            ))}
        </ul>
    );
});
