import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom} from './pageAtoms';
import {EmailParsedTableRow} from './EmailParsedTableRow';
import {CurrencyToggle} from './CurrencyToggle';
import {GmailItem} from '^api/tasting.api';
import {dateSortBy} from '^components/util/date';
import {SummarySectionMobile} from './mobile/SummarySectionMobile';
import {groupByDate} from './mobile/util/group-by-date';
import {EmailParsedTableGroupByDay} from './mobile/EmailParsedTableGroupByDay';

export const EmailParsedTable = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const oldestItem = gmailItems[0];
    const sortedItems = [...gmailItems].sort(dateSortBy('DESC', (item) => new Date(item.metadata.date)));

    const getDate = (item: GmailItem) => item?.metadata?.date;
    const dateFormat = (date: Date) => {
        return `${date.toLocaleDateString('en', {month: 'long'})}, ${date.getFullYear()}`;
    };
    const groupedItems = groupByDate(sortedItems);

    return (
        <>
            <>
                <div className="hidden sm:flex items-end justify-between mb-3">
                    <p className="text-center">
                        {oldestItem && (
                            <span>
                                Since <b>{dateFormat(getDate(oldestItem))}</b>
                            </span>
                        )}
                    </p>
                    <CurrencyToggle />
                </div>

                <SummarySectionMobile />
            </>

            <>
                <div className="hidden sm:block overflow-x-auto w-full shadow-2xl">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Service</th>
                                <th>Receipt</th>
                                <th className="text-right">Price</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedItems.map((item, i) => (
                                <EmailParsedTableRow key={i} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="block sm:hidden py-0">
                    <ul className="w-full text-left">
                        {Object.entries(groupedItems).map(([date, items], i) => (
                            <EmailParsedTableGroupByDay key={i} date={new Date(date)} items={items} />
                        ))}
                    </ul>
                </div>
            </>
        </>
    );
});
