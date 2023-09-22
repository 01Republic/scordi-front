import React, {memo} from 'react';
import {BillingHistoryDto} from '^types/billing.type';
import {useRouter} from 'next/router';
import {dayjs} from '^utils/dayjs';
import {HistoryItem} from '^v3/share/BillingHistoryListView/HistoryItem';
import {WithChildren} from '^types/global.type';
import {yyyy_mm_dd} from '^utils/dateTime';

interface DayGroupedListProps {
    date: Date;
    entries: BillingHistoryDto[];
    showTitle?: boolean;
}

export const DayGroupedList = memo((props: DayGroupedListProps) => {
    const {date, entries, showTitle = false} = props;
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
                {entries.map((entry, i) => (
                    <HistoryItem key={i} entry={entry} showTitle={showTitle} />
                ))}
            </ul>
        </li>
    );
});

interface DayGroupedAnyListProps extends WithChildren {
    date: Date;
    showTitle?: boolean;
}

export const DayGroupedAnyList = memo((props: DayGroupedAnyListProps) => {
    const {date, children, showTitle = false} = props;
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
        <li id={`billing_list_date--${yyyy_mm_dd(date)}`} className="py-1 px-3 -mx-3 rounded-md transition-all">
            <p className="text-xs text-gray-500 pl-2 border-l border-scordi">{dateText}</p>
            <ul className="py-4 w-full pl-2 border-l">{children}</ul>
        </li>
    );
});
