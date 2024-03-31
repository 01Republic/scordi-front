import React, {memo, useEffect, useState} from 'react';
import Calendar, {ViewCallbackProperties} from 'react-calendar';
import {firstDayOfMonth, monthAfter, monthBefore} from '^utils/dateTime';
import {useCalendar3} from '^hooks/useCalendar';
import {useBillingListV3} from '^hooks/useBillingList';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useModal} from '^v3/share/modals';
import {CalendarDateContent} from './CalendarDateContent';
import {dailyBillingHistoriesModal} from '../modals/DailyBillingHistoriesModal';

const asStartDate = (date: Date) => monthBefore(1, firstDayOfMonth(date));
const asEndDate = (date: Date) => monthAfter(2, firstDayOfMonth(date));

export const CalendarOnDesktop = memo(() => {
    const {selectedDate, selectDate, activeStartDate, setActiveStartDate, focusedMonth} = useCalendar3();
    const {updateStartDate, updateEndDate, groupedHistories, groupedSchedules, setStartDate, setEndDate} =
        useBillingListV3();
    const {open} = useModal(dailyBillingHistoriesModal);

    // focusedMonth 는 [일정]에서는 절대 변경하지 않습니다.
    // 이러한 특성을 활용해 [일정]의 componentDidMount 를 식별할 수 있습니다.
    useEffect(() => {
        if (focusedMonth) {
            setActiveStartDate(focusedMonth);
            setStartDate(asStartDate(focusedMonth));
            setEndDate(asEndDate(focusedMonth));
        }
    }, [focusedMonth]);

    const onDayClick = (date: Date) => {
        open();
        selectDate(date);
    };

    const calendarPrevMonthHandler = (date: Date) => {
        updateStartDate(asStartDate(date));
        setActiveStartDate(date);
    };

    const calendarNextMonthHandler = (date: Date) => {
        updateEndDate(asEndDate(date));
        setActiveStartDate(date);
    };

    return (
        <MobileSection.Item className={`rounded-box transition-all overflow-y-hidden shadow top-[50px]`}>
            <div className="w-full">
                <div></div>
                <div></div>
                <div></div>
                <br />
            </div>
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                value={selectedDate}
                activeStartDate={activeStartDate}
                showNavigation={false}
                formatDay={(locale, date) => date.getDate().toString()}
                tileClassName="react-calender__pc__tile"
                tileContent={({date}) => (
                    <CalendarDateContent
                        date={date}
                        groupedHistories={groupedHistories}
                        groupedSchedules={groupedSchedules}
                    />
                )}
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
