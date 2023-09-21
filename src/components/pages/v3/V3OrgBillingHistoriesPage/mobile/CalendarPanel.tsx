import React, {memo, useEffect} from 'react';
import Calendar, {ViewCallbackProperties} from 'react-calendar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCalendar3} from '^hooks/useCalendar';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {firstDayOfMonth, lastDayOfMonth, monthAfter, monthBefore, yyyy_mm_dd} from '^utils/dateTime';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useBillingListV3} from '^hooks/useBillingList';
import {useBillingHistoriesV3, useBillingSchedulesV3} from '^hooks/useBillingHistories';
import {BillingHistoryManager} from '^models/BillingHistory';
import {BillingScheduleManager} from '^models/BillingSchedule';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencySymbol, getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';

export const CalendarPanel = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {activeStartDate, setActiveStartDate} = useCalendar3();
    const {startDate, endDate, updateStartDate, updateEndDate, groupedHistories, groupedSchedules} = useBillingListV3();

    const calendarPrevMonthHandler = (date: Date) => {
        console.log('prev', {date, startDate});
        updateStartDate(date);
        setActiveStartDate(date);
    };

    const calendarNextMonthHandler = (date: Date) => {
        console.log('next', {date, endDate});
        updateEndDate(date);
        setActiveStartDate(date);
    };

    const now = new Date();

    return (
        <MobileSection.Item>
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                value={now}
                activeStartDate={activeStartDate}
                next2Label={null}
                prev2Label={null}
                // showNavigation={false}
                formatDay={(locale, date) => date.getDate().toString()}
                tileContent={({date}) => {
                    // const thisDay = intlDateLong(date);
                    // const payDay = calendarData?.find((item) => new Date(item.date).getDate() === date.getDate());
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
                }}
                onActiveStartDateChange={({action, activeStartDate: date}: ViewCallbackProperties) => {
                    const handler = {
                        prev: () => calendarPrevMonthHandler(date),
                        next: () => calendarNextMonthHandler(date),
                    }[action as 'next' | 'prev'];
                    handler();
                }}
            />
        </MobileSection.Item>
    );
});
