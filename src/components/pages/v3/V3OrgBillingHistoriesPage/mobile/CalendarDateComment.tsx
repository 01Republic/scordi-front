import React, {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {BillingHistoryManager} from '^models/BillingHistory';
import {BillingScheduleManager} from '^models/BillingSchedule';
import {currencyFormat} from '^utils/number';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {BillingHistoryDto, BillingScheduleShallowDto} from '^types/billing.type';

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

    const paidAmount = histories.getTotalPrice(displayCurrency).amount;
    const willPayAmount = schedules.getTotalPrice(displayCurrency);
    const totalAmount = Math.round(paidAmount + willPayAmount);

    return allLength ? (
        <div>
            <p className="money-text active">
                <span className="symbol">{symbol}</span>
                <span className="amount">{currencyFormat(totalAmount, '')}</span>
            </p>
        </div>
    ) : (
        <p className={'money-text--wrapper text-transparent'}>&nbsp;</p>
    );
});
