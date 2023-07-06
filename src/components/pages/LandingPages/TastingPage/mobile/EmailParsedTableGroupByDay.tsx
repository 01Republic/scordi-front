import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {dayjs} from '^utils/dayjs';
import {BillingHistoryDto} from '^types/billing.type';
import {EmailParsedTableRowMobile} from './EmailParsedTableRowMobile';

interface EmailParsedTableGroupByDayProps {
    date: Date;
    entries: BillingHistoryDto[];
    showTitle?: boolean;
}

export const EmailParsedTableGroupByDay = memo((props: EmailParsedTableGroupByDayProps) => {
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
                    <EmailParsedTableRowMobile key={i} entry={entry} showTitle={showTitle} />
                ))}
            </ul>
        </li>
    );
});
