import React, {memo, useEffect} from 'react';
import {lastDayOfMonth, yyyy_mm} from '^utils/dateTime';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {asEndDate, asStartDate} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthHandler';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {useBillingSchedulesV3} from '^models/BillingSchedule/hook';

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
        <div className="flex items-center gap-6 mb-6">
            <h1>{yyyy_mm(focusedMonth || new Date())}</h1>
            <div className="flex gap-1">
                <button className="btn btn-square btn-sm" onClick={() => prevMonth()}>
                    <GrFormPrevious size={20} />
                </button>
                <button className="btn btn-square btn-sm" onClick={() => nextMonth()}>
                    <GrFormNext size={20} />
                </button>
            </div>
        </div>
    );
});
MonthHandler.displayName = 'MonthHandler';
