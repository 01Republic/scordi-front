import React, {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {BillingScheduleManager} from '^models/BillingSchedule/manager';
import {currencyFormat} from '^utils/number';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {BillingScheduleShallowDto} from '^models/BillingSchedule/type';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface CalendarDateCommentProps {
    date: Date;
    groupedHistories: Record<string, BillingHistoryDto[]>;
    groupedSchedules: Record<string, BillingScheduleShallowDto[]>;
}

export const CalendarDateComment = memo((props: CalendarDateCommentProps) => {
    const {date, groupedHistories, groupedSchedules} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);

    const dayKey = yyyy_mm_dd(date);
    const histories = BillingHistoryManager.init(groupedHistories[dayKey] || []);
    const schedules = BillingScheduleManager.init(groupedSchedules[dayKey] || []);
    const allLength = histories.length + schedules.length;

    const paidAmount = histories.getTotalPrice(displayCurrency);
    const willPayAmount = schedules.getTotalPrice(displayCurrency);
    const totalAmount = Math.round(paidAmount + willPayAmount);

    return allLength ? (
        <div className="h-[22px]">
            <p className="money-text active relative">
                <span className="symbol hidden sm:block">{symbol}</span>
                <span className="amount">{currencyFormat(totalAmount, '')}</span>
            </p>
        </div>
    ) : (
        <p className={'money-text--wrapper text-transparent'}>&nbsp;</p>
    );
});
