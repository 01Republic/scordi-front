import React, {memo, useEffect} from 'react';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {firstDayOfMonth, lastDayOfMonth} from '^utils/dateTime';
import {BiCaretLeft, BiCaretRight} from 'react-icons/bi';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {useBillingSchedulesV3} from '^models/BillingSchedule/hook';

export const asStartDate = (date: Date) => firstDayOfMonth(date).toISOString();
export const asEndDate = (date: Date) => lastDayOfMonth(date).toISOString();

export const MonthHandler = memo(() => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {focusedMonth, prevMonth, nextMonth, prevAvailable, nextAvailable} = useFocusedMonth({
        cached: false,
        maxDate: lastDayOfMonth(),
        maxUnavailableMsg: '이번 달 까지만 조회할 수 있어요',
    });
    const {search: loadHistories} = useBillingHistoriesV3();
    const {search: loadSchedules} = useBillingSchedulesV3();

    useEffect(() => {
        if (!organizationId || !focusedMonth) return;

        const query = {
            where: {organizationId},
            startDate: asStartDate(focusedMonth),
            endDate: asEndDate(focusedMonth),
            itemsPerPage: 0,
            isActiveSubscription: true,
        };

        // @ts-ignore
        loadHistories({...query, order: {issuedAt: 'ASC'}});
        loadSchedules({...query, order: {billingDate: 'ASC'}});
    }, [organizationId, focusedMonth]);

    return (
        <div className="flex mb-4">
            <div className="flex items-center justify-between cursor-pointer no-selectable">
                <span className={`pr-2 -ml-1.5 ${!prevAvailable() && 'text-slate-300'}`} onClick={prevMonth}>
                    <BiCaretLeft size={20} />
                </span>
                <span className="text-[16px] font-semibold">{focusedMonth ? focusedMonth.getMonth() + 1 : '?'}월</span>
                <span className={`pl-2 ${!nextAvailable() && 'text-slate-300'}`} onClick={nextMonth}>
                    <BiCaretRight size={20} />
                </span>
            </div>
        </div>
    );
});
