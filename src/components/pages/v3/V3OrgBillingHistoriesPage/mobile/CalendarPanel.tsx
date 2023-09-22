import React, {memo} from 'react';
import Calendar, {ViewCallbackProperties} from 'react-calendar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCalendar3} from '^hooks/useCalendar';
import {useBillingListV3} from '^hooks/useBillingList';
import {CalendarDateComment} from '^v3/V3OrgBillingHistoriesPage/mobile/CalendarDateComment';
import {yyyy_mm_dd} from '^utils/dateTime';

export const CalendarPanel = memo(() => {
    const {selectedDate, selectDate, activeStartDate, setActiveStartDate} = useCalendar3();
    const {startDate, endDate, updateStartDate, updateEndDate, groupedHistories, groupedSchedules} = useBillingListV3();

    const onDayClick = (date: Date) => {
        const focusedColorClass = 'bg-scordi-light-50';

        document.querySelectorAll('.billing_list_date_focused').forEach((old) => {
            old.classList.remove('billing_list_date_focused');
            old.classList.remove(focusedColorClass);
        });

        // smooth scroll to element and align it at the bottom
        const selector = `#billing_list_date--${yyyy_mm_dd(date)}`;
        const elem = document.querySelector(selector);
        if (elem) {
            elem.scrollIntoView({behavior: 'smooth', block: 'center'});
            elem.classList.add('billing_list_date_focused');
            elem.classList.add(focusedColorClass);
        }
        selectDate(date);
    };

    const calendarPrevMonthHandler = (date: Date) => {
        console.log('action: prev', {date, startDate});
        updateStartDate(date);
        setActiveStartDate(date);
    };

    const calendarNextMonthHandler = (date: Date) => {
        console.log('action: next', {date, endDate});
        updateEndDate(date);
        setActiveStartDate(date);
    };

    return (
        <MobileSection.Item className="sticky top-0 shadow">
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                value={selectedDate}
                activeStartDate={activeStartDate}
                next2Label={null}
                prev2Label={null}
                // showNavigation={false}
                formatDay={(locale, date) => date.getDate().toString()}
                tileContent={({date}) => {
                    return (
                        <CalendarDateComment
                            date={date}
                            groupedHistories={groupedHistories}
                            groupedSchedules={groupedSchedules}
                        />
                    );
                }}
                onActiveStartDateChange={({action, activeStartDate: date}: ViewCallbackProperties) => {
                    const handler =
                        {
                            prev: () => calendarPrevMonthHandler(date),
                            next: () => calendarNextMonthHandler(date),
                        }[action as 'next' | 'prev'] || (() => {});
                    handler();
                }}
                onClickDay={onDayClick}
            />
        </MobileSection.Item>
    );
});
