import React, {memo} from 'react';
import {
    changePriceCurrency,
    currencyFormat,
    getCurrencySymbol,
    Price,
} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';
import {GmailItem} from '^api/tasting.api';
import {Avatar} from '^components/Avatar';
import {hh_mm} from '^utils/dateTime';
import {dayjs} from '^utils/dayjs';
import {useRouter} from 'next/router';
import {useTastingItemDetailModal} from './TastingItemDetailModal';

interface EmailParsedTableRowProps {
    date: Date;
    serviceName: string;
    title: string;
    attachments: {
        uid: string;
        fileName: string;
        url: string;
    }[];
    sender: string;
    price: Price;
}

export const EmailParsedTableRow = memo((props: {item: GmailItem}) => {
    // const {date, serviceName, title, attachments, sender, price} = props;
    const {item} = props;
    const {setModal} = useTastingItemDetailModal();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const date = item.metadata.date;
    const serviceName = item.provider;
    const title = item.title;
    const attachments = item.attachments;
    const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');
    const price = item.price;

    const symbol = getCurrencySymbol(displayCurrency);
    const amount = changePriceCurrency(price.amount, price.currency, displayCurrency);

    return (
        <tr onClick={() => setModal(item)}>
            <td>
                <p className="text-gray-700">{date.toLocaleString()}</p>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    {/*<div className="avatar">*/}
                    {/*    <div className="mask mask-squircle w-12 h-12">*/}
                    {/*        <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div>
                        <div className="font-bold capitalize">{serviceName}</div>
                        <div className="text-sm opacity-50">{sender}</div>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-1.5">{title}</p>
                <div className="flex space-x-1">
                    {attachments.map((attachment, i) => (
                        <span key={i} className="badge badge-ghost badge-sm">
                            {attachment.fileName}
                        </span>
                    ))}
                </div>
            </td>
            <td>
                <p className="text-right">
                    {price.hide ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{symbol}</small>
                            <span>{currencyFormat(amount || 0, displayCurrency)}</span>
                        </>
                    )}
                </p>
            </td>
            <th>{/*<button className="btn btn-ghost btn-xs">details</button>*/}</th>
        </tr>
    );
});

export function groupByDate(items: GmailItem[]): Record<string, GmailItem[]> {
    const container: Record<string, GmailItem[]> = {};
    const getDate = (item: GmailItem) => item?.metadata?.date;

    items.forEach((item) => {
        const date = getDate(item);
        container[date?.toISOString()] ||= [];
        container[date?.toISOString()].push(item);
    });

    return container;
}

export const EmailParsedTableGroupByDay = memo((props: {date: Date; items: GmailItem[]}) => {
    const {date, items} = props;
    const router = useRouter();

    dayjs.locale(router.locale);

    const dateText = (() => {
        const long = dayjs(date).format('llll');
        const short = dayjs(date).format('LT');
        let text = long.replace(short, '');
        if (date.getFullYear() === new Date().getFullYear()) {
            const year = dayjs(date).format('YYYY');
            text = text.replace(new RegExp(`\\S*${year}\\S*`), '');
        }
        return text.trim();
    })();

    return (
        <li className="py-1">
            <p className="text-xs text-gray-500 pl-2 border-l border-scordi">{dateText}</p>
            <ul className="py-4 w-full pl-2 border-l">
                {items.map((item, i) => (
                    <EmailParsedTableRowMobile key={i} item={item} />
                ))}
            </ul>
        </li>
    );
});

export const EmailParsedTableRowMobile = memo((props: {item: GmailItem}) => {
    const {item} = props;
    const {setModal} = useTastingItemDetailModal();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const date = item.metadata.date;
    const serviceName = item.provider;
    const title = item.title;
    const attachments = item.attachments;
    const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');
    const price = item.price;

    const symbol = getCurrencySymbol(displayCurrency);
    const amount = changePriceCurrency(price.amount, price.currency, displayCurrency);

    return (
        <li
            data-component="EmailParsedTableRowMobile"
            className="flex gap-4 mb-4 px-0 cursor-pointer"
            onClick={() => setModal(item)}
        >
            <div className="">
                <p className="text-[16px] font-semibold">{serviceName}</p>
                <p className="leading-none">
                    <small className="text-xs text-gray-500">{hh_mm(date)}</small>
                </p>
            </div>

            <div className="ml-auto flex flex-col items-start">
                <p className="text-[16px] text-right font-bold">
                    {price.hide ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{symbol}</small>
                            <span>{currencyFormat(amount || 0, displayCurrency)}</span>
                        </>
                    )}
                </p>
            </div>
        </li>
    );
});
