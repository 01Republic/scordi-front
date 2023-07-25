import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom} from './pageAtoms';
import {EmailParsedTableRow} from './EmailParsedTableRow';
import {CurrencyToggle} from './CurrencyToggle';
import {GmailItem} from '^api/tasting.api';
import {dateSortBy} from '^components/util/date';
import {useDraftResult} from './hooks/useDraft';
import {SummarySectionMobile} from './mobile/SummarySectionMobile';
import {groupByDate} from './mobile/util/group-by-date';
import {EmailParsedTableGroupByDay} from './mobile/EmailParsedTableGroupByDay';
import {LoadMoreDraftButton} from './LoadMore/LoadMoreDraftButton';

export const EmailParsedTable = memo(() => {
    const {billingHistories = [], oldestHistory} = useDraftResult();

    const dateFormat = (date: Date) => {
        return `${date.toLocaleDateString('en', {month: 'long'})}, ${date.getFullYear()}`;
    };
    const groupedHistories = groupByDate(billingHistories, (history) => {
        return new Date(history.issuedAt);
    });

    return (
        <>
            <>
                <div className="hidden sm:flex items-end justify-between mb-3">
                    <p className="text-center">
                        {oldestHistory && (
                            <span>
                                Since <b>{dateFormat(new Date(oldestHistory.issuedAt))}</b>
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
                            {billingHistories.map((history, i) => (
                                <EmailParsedTableRow key={i} billingHistory={history} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="block sm:hidden py-0">
                    <ul className="w-full text-left">
                        {Object.entries(groupedHistories).map(([date, histories], i) => (
                            <EmailParsedTableGroupByDay key={i} date={new Date(date)} entries={histories} />
                        ))}
                    </ul>
                </div>

                <div className="text-center mt-10 w-full p-4 sm:p-0">
                    <LoadMoreDraftButton />
                </div>
            </>
        </>
    );
});
