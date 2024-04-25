import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {yyyy_mm_dd} from '^utils/dateTime';
import {currencyFormat} from '^utils/number';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {BillingScheduleManager} from '^models/BillingSchedule/manager';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {BillingScheduleShallowDto} from '^models/BillingSchedule/type';

interface CalendarDateContentProps {
    date: Date;
    groupedHistories: Record<string, BillingHistoryDto[]>;
    groupedSchedules: Record<string, BillingScheduleShallowDto[]>;
}

export const CalendarDateContent = memo((props: CalendarDateContentProps) => {
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

    return (
        <div className="react-calendar__pc__tile--content">
            <p className="money-text relative">
                <span className="amount">
                    {currencyFormat(allLength, '')} <span className="text-11">건</span>
                </span>
            </p>
            <p className="money-text active relative">
                <span className="amount">
                    {currencyFormat(totalAmount, '')} <span className="text-11">원</span>
                </span>
            </p>
        </div>
    );
});
CalendarDateContent.displayName = 'CalendarDateContent';
