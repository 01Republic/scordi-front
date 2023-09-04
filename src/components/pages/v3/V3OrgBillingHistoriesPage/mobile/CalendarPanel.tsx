import React, {memo, useEffect} from 'react';
import Calendar, {ViewCallbackProperties} from 'react-calendar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCalendar3} from '^hooks/useCalendar';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {firstDayOfMonth, lastDayOfMonth, monthAfter, monthBefore, yyyy_mm_dd} from '^utils/dateTime';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useBillingListV3} from '^hooks/useBillingList';

export const CalendarPanel = memo(() => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {focusedMonth} = useFocusedMonth();
    const {calendarData, activeStartDate, setActiveStartDate, loadCalendar} = useCalendar3();
    const {startDate, endDate, groupedBillingList, initRangeDate, updateStartDate, updateEndDate} = useBillingListV3();
    const now = new Date();

    useEffect(() => {
        if (!focusedMonth) return;
        setActiveStartDate(firstDayOfMonth(focusedMonth || now));

        const from = firstDayOfMonth(monthBefore(1, focusedMonth));
        const to = lastDayOfMonth(monthAfter(1, focusedMonth));
        initRangeDate(from, to);
    }, []);

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

    console.log('groupedBillingList', groupedBillingList);

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
                    const dayKey = yyyy_mm_dd(date);
                    const billingList = groupedBillingList[dayKey] || [];
                    // const payDay = calendarData?.find((item) => new Date(item.date).getDate() === date.getDate());
                    if (billingList.length) console.log(dayKey, billingList);
                    return billingList.length ? (
                        <div>
                            <p className="money-text active">
                                <span className="symbol">$</span>
                                <span className="amount">{10}</span>
                            </p>
                        </div>
                    ) : (
                        <p className={'money-text--wrapper text-transparent'}>&nbsp;</p>
                    );
                }}
                onActiveStartDateChange={({action, activeStartDate: date}: ViewCallbackProperties) => {
                    const handler = {
                        next: () => calendarNextMonthHandler(date),
                        prev: () => calendarPrevMonthHandler(date),
                    }[action as 'next' | 'prev'];
                    handler();
                }}
            />
        </MobileSection.Item>
    );
});
