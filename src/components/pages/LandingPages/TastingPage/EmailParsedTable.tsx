import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom} from './pageAtoms';
import {EmailParsedTableRow} from './EmailParsedTableRow';
import {CurrencyToggle} from './CurrencyToggle';
import {GmailItem} from '^api/tasting.api';
import {dateSortBy} from '^components/util/date';

export const EmailParsedTable = memo(() => {
    const gmailItems = useRecoilValue(gmailItemsAtom);
    const oldestItem = gmailItems[0];
    const sortedItems = [...gmailItems].sort(dateSortBy('DESC', (item) => item.metadata.date));

    const getDate = (item: GmailItem) => item?.metadata?.date;
    const dateFormat = (date: Date) => {
        return `${date.toLocaleDateString('en', {month: 'long'})}, ${date.getFullYear()}`;
    };

    return (
        <>
            <div className="flex items-end justify-between mb-3">
                <p className="text-center">
                    {oldestItem && (
                        <span>
                            Since <b>{dateFormat(getDate(oldestItem))}</b>
                        </span>
                    )}
                </p>
                <CurrencyToggle />
            </div>

            <div className="overflow-x-auto w-full shadow-2xl">
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
                            <EmailParsedTableRow
                                key={i}
                                date={item.metadata.date}
                                serviceName={item.provider}
                                title={item.title}
                                attachments={item.attachments.map((file) => ({
                                    id: file.body.attachmentId,
                                    filename: file.filename,
                                    mimeType: file.mimeType,
                                }))}
                                sender={item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1')}
                                price={item.price}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
});
