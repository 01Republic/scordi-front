import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {gmailItemsAtom, gmailItemsLoadedAtom} from './pageAtoms';
import {
    EmailParsedTableGroupByDay,
    EmailParsedTableRow,
    EmailParsedTableRowMobile,
    groupByDate,
} from './EmailParsedTableRow';
import {CurrencyToggle} from './CurrencyToggle';
import {GmailItem} from '^api/tasting.api';
import {dateSortBy} from '^components/util/date';
import {useSummaryStatServices} from '^components/pages/LandingPages/TastingPage/SummarySectionStatServices';
import {useTranslation} from 'next-i18next';
import {useSummaryStatInvoices} from '^components/pages/LandingPages/TastingPage/SummarySectionStatInvoices';

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
                                <EmailParsedTableRow
                                    key={i}
                                    date={item.metadata.date}
                                    serviceName={item.provider}
                                    title={item.title}
                                    attachments={item.attachments}
                                    sender={item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1')}
                                    price={item.price}
                                />
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

const SummarySectionMobile = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    useSummaryStatServices('detected-services2');
    useSummaryStatInvoices('detected-invoices2');
    const {t} = useTranslation('publicTasting');

    return (
        <div className="flex sm:hidden items-center justify-around py-5">
            <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">{t('summary_stat.services.label')}</p>
                <p className="font-semibold text-16">
                    <span id="detected-services2" className="" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.services.unit')}</small>
                </p>
            </div>

            <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">{t('summary_stat.invoice.label')}</p>
                <p className="font-semibold text-16">
                    <span id="detected-invoices2" className="" />
                    <small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>
                </p>
            </div>
        </div>
    );
});
