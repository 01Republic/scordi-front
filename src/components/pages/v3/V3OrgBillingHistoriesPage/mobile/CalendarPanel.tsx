import React, {memo, useState} from 'react';
import Calendar, {ViewCallbackProperties} from 'react-calendar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCalendar3} from '^hooks/useCalendar';
import {useBillingListV3} from '^hooks/useBillingList';
import {CalendarDateComment} from '^v3/V3OrgBillingHistoriesPage/mobile/CalendarDateComment';
import {yyyy_mm_dd} from '^utils/dateTime';
import {BsFillCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs';

export const CalendarPanel = memo(() => {
    const {selectedDate, selectDate, activeStartDate, setActiveStartDate} = useCalendar3();
    const {updateStartDate, updateEndDate, groupedHistories, groupedSchedules} = useBillingListV3();
    const [isFold, setFold] = useState(false);

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
        updateStartDate(date);
        setActiveStartDate(date);
    };

    const calendarNextMonthHandler = (date: Date) => {
        updateEndDate(date);
        setActiveStartDate(date);
    };

    return (
        <MobileSection.Item
            className={`sticky top-0 shadow z-10 transition-all overflow-y-hidden ${isFold ? 'min-h-0 h-0' : ''}`}
        >
            <div
                className={`fixed right-0 px-4 text-[16px] text-gray-500 transition-all ${
                    isFold ? 'top-0 py-4' : 'top-[50px] py-3'
                }`}
                onClick={() => setFold((d) => !d)}
            >
                달력 {!isFold ? <span>접기</span> : <span>펼치기</span>}
            </div>
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                value={selectedDate}
                activeStartDate={activeStartDate}
                prevLabel={<BsFillCaretLeftFill className="mx-auto" />}
                nextLabel={<BsFillCaretRightFill className="mx-auto" />}
                prev2Label={null}
                next2Label={null}
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
