// 결제내역과 결제예정내역을 통합 조회합니다.
// 옛날 버전 조직홈에서(대시보드) 특정일의 결제내역과 결제예정내역을 조회하는 기능입니다.
import {useEffect} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {calendarSelectedDateState} from '^atoms/calendarData.atom';
import {billingHistoriesState, billingSchedulesState} from '^atoms/billingHistories.atom';
import {
    getBillingHistories,
    getBillingHistoriesAll,
    getBillingSchedules,
    getBillingSchedulesAll,
} from '^api/billing.api';
import {BillingHistoryDto, BillingScheduleShallowDto as ScheduleDto} from '^types/billing.type';
import {sortBy, uniq, uniqBy} from 'lodash';
import {dayAfter, firstDayOfMonth, lastDayOfMonth, yyyy_mm_dd} from '^utils/dateTime';
import {errorNotify} from '^utils/toast-notify';
import {
    billingListEndDateAtom,
    billingListStartDateAtom,
    billingListGroupByDateAtom,
    BillingListItemDto,
} from '^atoms/billingList.atom';
import {useBillingHistoriesV3, useBillingSchedulesV3} from '^hooks/useBillingHistories';
import {BillingHistoryManager} from '^models/BillingHistory';
import {BillingScheduleManager} from '^models/BillingSchedule';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';

interface GetBillingListParams {
    startDate: Date;
    endDate: Date;
}

// 결제내역과 결제예정내역을 통합 조회합니다.
// 기존 함수가 페이지네이션 기능과 특정일 이상의 날짜범위 검색을 추가하기에 적절하지 않은 구조로 되어있어
// 새롭게 페이지네이션과 날짜범위검색 기능을 지원할 수 있도록 개선하여 만들었습니다.
export const useBillingListV3 = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {focusedMonth} = useFocusedMonth();
    const [startDate, setStartDate] = useRecoilState(billingListStartDateAtom);
    const [endDate, setEndDate] = useRecoilState(billingListEndDateAtom);

    const {result: pagedHistories, search: loadHistories} = useBillingHistoriesV3();
    const {result: pagedSchedules, search: loadSchedules} = useBillingSchedulesV3();
    const loadData = (_startDate: Date, _endDate: Date) => {
        const params = {
            where: {organizationId},
            startDate: _startDate.toISOString(),
            endDate: _endDate.toISOString(),
        };
        loadHistories({...params, order: {issuedAt: 'ASC'}, itemsPerPage: 0});
        loadSchedules({...params, order: {billingDate: 'ASC'}, itemsPerPage: 0});
    };

    useEffect(() => {
        if (!organizationId || !focusedMonth) return;

        setStartDate(firstDayOfMonth(focusedMonth));
        setEndDate(lastDayOfMonth(focusedMonth));
        loadData(startDate, endDate);
    }, [organizationId, focusedMonth]);

    useEffect(() => {
        if (startDate && endDate) loadData(startDate, endDate);
    }, [startDate, endDate]);

    const BillingHistory = BillingHistoryManager.init(pagedHistories.items).paid();
    const BillingSchedule = BillingScheduleManager.init(pagedSchedules.items)
        .exceptFor(BillingHistory)
        .validateToListing();

    const groupedHistories = BillingHistory.groupByIssuedAtYMD();
    const groupedSchedules = BillingSchedule.groupByBillingDateYMD();

    // [전방탐색] 조회 시작일 변경 (더 이전 시점까지 조회)
    const updateStartDate = async (date: Date) => {
        // 새 조회시작일은 이전 조회시작일보다 작아야 합니다.
        // => 새 조회시작일이 이전 조회시작일보다 크거나 같으면 흐름을 차단합니다.
        if (startDate.getTime() <= date.getTime()) {
            return console.log('[skipped] updateStartDate');
        }
        setStartDate(date);
    };

    // [후방탐색] 조회 종료일 변경 (더 이후 시점까지 조회)
    const updateEndDate = async (date: Date) => {
        // 새 조회종료일은 이전 조회종료일보다 커야 합니다.
        // => 새 조회종료일이 이전 조회종료일보다 작거나 같으면 흐름을 차단합니다.
        if (date.getTime() <= endDate.getTime()) {
            return console.log('[skipped] updateEndDate');
        }
        setEndDate(date);
    };

    return {
        startDate,
        endDate,
        updateStartDate,
        updateEndDate,
        groupedHistories,
        groupedSchedules,
    };
};

/**
 * [DEPRECATED] useBillingListV3() 를 사용하세요.
 */
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
