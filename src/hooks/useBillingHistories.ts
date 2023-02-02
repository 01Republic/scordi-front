import {useRecoilState, useRecoilValue} from 'recoil';
import {
    billingHistoriesState,
    billingSchedulesState,
    getBillingHistoriesQuery,
    getBillingHistoryQuery,
    getBillingSchedulesQuery,
} from '^atoms/billingHistories.atom';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {calendarSelectedDateState} from '^atoms/calendarData.atom';
import {useEffect} from 'react';
import {dayAfter} from '^utils/dateTime';
import {getBillingHistories, getBillingSchedules} from '^api/billing.api';
import {errorNotify} from '^utils/toast-notify';

export const useBillingSchedules = () => useRecoilValue(getBillingSchedulesQuery);
export const useBillingHistories = () => useRecoilValue(getBillingHistoriesQuery);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);

export const useBillingList = () => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const selectedDate = useRecoilValue(calendarSelectedDateState);
    const [billingHistories, setBillingHistories] = useRecoilState(billingHistoriesState);
    const [billingSchedules, setBillingSchedules] = useRecoilState(billingSchedulesState);

    useEffect(() => {
        const query = {
            where: {organizationId},
            startDate: selectedDate.toISOString(),
            endDate: dayAfter(1, selectedDate).toISOString(),
        };

        Promise.all([getBillingHistories(query), getBillingSchedules(query)])
            .then(([hisRes, schRes]) => {
                setBillingHistories(hisRes.data.items);
                setBillingSchedules(schRes.data.items);
            })
            .catch(errorNotify);
    }, [selectedDate]);

    return {selectedDate, billingHistories, billingSchedules};
};
