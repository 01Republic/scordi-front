import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {dayjs} from '^utils/dayjs';
import {WithChildren} from '^types/global.type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {HistoryItem} from './HistoryItem';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface DayGroupedListProps extends WithChildren {
    date: Date;
    entries?: BillingHistoryDto[];
    showTitle?: boolean;
}

export const DayGroupedList = memo((props: DayGroupedListProps) => {
    const {date, entries = [], children, showTitle = false} = props;
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
            <ul className="py-4 w-full pl-2 border-l">
                {children || entries.map((entry, i) => <HistoryItem key={i} entry={entry} showTitle={showTitle} />)}
            </ul>
        </li>
    );
});
