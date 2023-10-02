// 결제내역과 결제예정내역을 통합 조회합니다.
// 옛날 버전 조직홈에서(대시보드) 특정일의 결제내역과 결제예정내역을 조회하는 기능입니다.
import {useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {dayAfter} from '^utils/dateTime';
import {errorNotify} from '^utils/toast-notify';
import {getBillingHistories, getBillingSchedules} from '^api/billing.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {billingHistoriesState} from '^atoms/billingHistories.atom';
import {billingSchedulesState} from '^atoms/billingSchedules.atom';
import {calendarSelectedDateState} from '^atoms/calendarData.atom';
import {
    billingListEndDateAtom,
    billingListHistoriesAtom,
    billingListSchedulesAtom,
    billingListStartDateAtom,
} from '^atoms/billingList.atom';
import {BillingHistoryManager} from '^models/BillingHistory';
import {BillingScheduleManager, exceptBilledSchedules} from '^models/BillingSchedule';
import {GetBillingHistoriesParams, GetBillingSchedulesParams} from '^types/billing.type';

// 결제내역과 결제예정내역을 통합 조회합니다.
// 기존 함수가 페이지네이션 기능과 특정일 이상의 날짜범위 검색을 추가하기에 적절하지 않은 구조로 되어있어
// 새롭게 페이지네이션과 날짜범위검색 기능을 지원할 수 있도록 개선하여 만들었습니다.
export const useBillingListV3 = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const [startDate, setStartDate] = useRecoilState(billingListStartDateAtom);
    const [endDate, setEndDate] = useRecoilState(billingListEndDateAtom);
    const {result: groupedHistories, search: loadHistories} = useBillingHistoriesInCalendar();
    const {result: groupedSchedules, search: loadSchedules} = useBillingSchedulesInCalendar();

    const loadData = useCallback(
        (_startDate: Date, _endDate: Date) => {
            if (!organizationId || isNaN(organizationId)) return;
            const params = {
                where: {organizationId},
                startDate: _startDate.toISOString(),
                endDate: _endDate.toISOString(),
            };
            loadHistories({...params, order: {issuedAt: 'ASC'}, itemsPerPage: 0});
            loadSchedules({...params, order: {billingDate: 'ASC'}, itemsPerPage: 0});
        },
        [organizationId],
    );

    // 시작일 또는 종료일이 변경되면
    // 데이터를 호출합니다.
    useEffect(() => {
        if (startDate && endDate) loadData(startDate, endDate);
    }, [startDate, endDate]);

    // [전방탐색] 조회 시작일 변경 (더 이전 시점까지 조회)
    const updateStartDate = (date: Date) => {
        // 새 조회시작일은 이전 조회시작일보다 작아야 합니다.
        // => 새 조회시작일이 이전 조회시작일보다 크거나 같으면 흐름을 차단합니다.
        if (startDate && startDate.getTime() <= date.getTime()) {
            return console.log('[skipped] updateStartDate');
        }
        setStartDate(date);
    };

    // [후방탐색] 조회 종료일 변경 (더 이후 시점까지 조회)
    const updateEndDate = (date: Date) => {
        // 새 조회종료일은 이전 조회종료일보다 커야 합니다.
        // => 새 조회종료일이 이전 조회종료일보다 작거나 같으면 흐름을 차단합니다.
        if (endDate && date.getTime() <= endDate.getTime()) {
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
        groupedSchedules: exceptBilledSchedules(groupedHistories, groupedSchedules),
        setStartDate,
        setEndDate,
    };
};

// 캘린더 전용 결제내역 조회
const useBillingHistoriesInCalendar = () => {
    const {queryAtom, resultAtom} = billingListHistoriesAtom;
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    const [isLoading, setIsLoading] = useState(false);

    async function search(params: GetBillingHistoriesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        setIsLoading(true);
        const items = await getBillingHistories(params).then((res) => res.data.items);
        const groupedHistories = BillingHistoryManager.init(items).toCalendarData();

        setResult(groupedHistories);
        setQuery(params);
        setIsLoading(false);
    }

    return {result, search, isLoading};
};

// 캘린더 전용 결제예정내역 조회
const useBillingSchedulesInCalendar = () => {
    const {resultAtom, queryAtom} = billingListSchedulesAtom;
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    const [isLoading, setIsLoading] = useState(false);

    async function search(params: GetBillingSchedulesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        setIsLoading(true);
        const items = await getBillingSchedules(params).then((res) => res.data.items);
        const groupedSchedules = BillingScheduleManager.init(items).toCalendarData();

        setResult(groupedSchedules);
        setQuery(params);
        setIsLoading(false);
    }

    return {result, search, isLoading};
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
        const date = selectedDate || new Date();
        const query = {
            where: {organizationId},
            startDate: date.toISOString(),
            endDate: dayAfter(1, date).toISOString(),
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
