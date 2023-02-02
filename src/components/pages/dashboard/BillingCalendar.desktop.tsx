import React, {memo, useEffect} from 'react';
import Calendar from 'react-calendar';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {useCalendar2} from '^hooks/useCalendar';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useDashboardSummary2} from '^hooks/useDashboardSummary';

export const BillingCalendarDesktop = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const today = new Date();
    const {calendarData, setCalendar, year, month, selectDate} = useCalendar2();
    const {setSummary} = useDashboardSummary2();

    const changeMonth = (activeStartDate: Date) => {
        const y = activeStartDate.getFullYear();
        const m = activeStartDate.getMonth() + 1;
        const url = `${OrgHomeRoute.path(organizationId)}?y=${y}&m=${m}`;
        history.replaceState({}, '', url);
        setCalendar(y, m);
        setSummary(y, m);
        selectDate(new Date(y, m - 1, 1));
    };

    const clickDate = (date: Date) => selectDate(date);

    if (!calendarData) return <></>;

    return (
        <>
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                onChange={clickDate}
                value={today}
                activeStartDate={new Date(year, month - 1, 1)}
                formatDay={(locale, date) => date.getDate().toString()}
                tileContent={({date}) => {
                    const payDay = calendarData?.find((item) => new Date(item.date).getDate() === date.getDate());
                    return !!payDay ? (
                        <div>
                            <p className="money-text active">
                                <span className="symbol">$</span>
                                <span className="amount">{payDay.amount.toLocaleString()}</span>
                            </p>
                        </div>
                    ) : (
                        <p className={'money-text--wrapper text-transparent'}>&nbsp;</p>
                    );
                }}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                onActiveStartDateChange={({activeStartDate}) => changeMonth(activeStartDate)}
            />
        </>
    );
});
