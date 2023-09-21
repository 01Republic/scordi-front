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
import {dayAfter, yyyy_mm_dd} from '^utils/dateTime';
import {errorNotify} from '^utils/toast-notify';
import {
    billingListEndDateAtom,
    billingListStartDateAtom,
    billingListGroupByDateAtom,
    BillingListItemDto,
} from '^atoms/billingList.atom';

interface GetBillingListParams {
    startDate: Date;
    endDate: Date;
}

// 결제내역과 결제예정내역을 통합 조회합니다.
// 기존 함수가 페이지네이션 기능과 특정일 이상의 날짜범위 검색을 추가하기에 적절하지 않은 구조로 되어있어
// 새롭게 페이지네이션과 날짜범위검색 기능을 지원할 수 있도록 개선하여 만들었습니다.
export const useBillingListV3 = () => {
    const organizationId = useRecoilValue(orgIdParamState);
    const [startDate, setStartDate] = useRecoilState(billingListStartDateAtom);
    const [endDate, setEndDate] = useRecoilState(billingListEndDateAtom);
    const [billingHistories, setBillingHistories] = useRecoilState(billingHistoriesState);
    const [billingSchedules, setBillingSchedules] = useRecoilState(billingSchedulesState);
    const [groupedBillingList, setGroupedBillingList] = useRecoilState(billingListGroupByDateAtom);

    const uniqueSortHistories = (items: BillingHistoryDto[]) => {
        return sortBy(uniqBy(items, 'id'), 'paidAt');
    };

    const uniqueSortSchedules = (items: ScheduleDto[]) => {
        return sortBy(
            uniqBy(items, (item) => [item.productId, item.billingDate, item.billingAmount]),
            'billingDate',
        );
    };

    const sortList = () => {
        const newGroupedList: Record<string, BillingListItemDto[]> = {};
        const appendList = (item: BillingListItemDto, date: Date) => {
            const key = yyyy_mm_dd(date);
            newGroupedList[key] ||= [];
            newGroupedList[key].push(item);
        };

        billingHistories.forEach((item) => {
            appendList(item, new Date(item.paidAt || item.issuedAt));
        });

        billingSchedules.forEach((item) => {
            appendList(item, new Date(item.billingDate));
        });

        setGroupedBillingList(newGroupedList);
    };

    function fetchBillingList(_params: GetBillingListParams) {
        const params = {
            where: {organizationId},
            startDate: _params.startDate.toISOString(),
            endDate: _params.endDate.toISOString(),
        };
        return Promise.all([getBillingHistoriesAll(params), getBillingSchedulesAll(params)]).catch(errorNotify);
    }

    // 최초 로딩
    const initRangeDate = async (from: Date, to: Date) => {
        const res = await fetchBillingList({startDate: from, endDate: to});
        if (!res) return;

        const [newHistories, newSchedules] = res;
        setBillingHistories(uniqueSortHistories(newHistories));
        setBillingSchedules(uniqueSortSchedules(newSchedules));
        setStartDate(from);
        setEndDate(to);
        sortList();
    };

    // [전방탐색] 조회 시작일 변경 (더 이전 시점까지 조회)
    const updateStartDate = async (date: Date) => {
        // 새 조회시작일은 이전 조회시작일보다 작아야 합니다.
        // => 새 조회시작일이 이전 조회시작일보다 크거나 같으면 흐름을 차단합니다.
        if (startDate.getTime() <= date.getTime()) {
            console.log('[skipped] updateStartDate');
            return;
        }

        const res = await fetchBillingList({startDate: date, endDate: startDate});
        if (!res) return;

        const [newHistories, newSchedules] = res;
        setBillingHistories((list) => uniqueSortHistories([...newHistories, ...list]));
        setBillingSchedules((list) => uniqueSortSchedules([...newSchedules, ...list]));
        setStartDate(date);
        sortList();
    };

    // [후방탐색] 조회 종료일 변경 (더 이후 시점까지 조회)
    const updateEndDate = async (date: Date) => {
        // 새 조회종료일은 이전 조회종료일보다 커야 합니다.
        // => 새 조회종료일이 이전 조회종료일보다 작거나 같으면 흐름을 차단합니다.
        if (date.getTime() <= endDate.getTime()) {
            console.log('[skipped] updateEndDate');
            return;
        }

        const res = await fetchBillingList({startDate: endDate, endDate: date});
        if (!res) return;

        const [newHistories, newSchedules] = res;
        setBillingHistories((list) => uniqueSortHistories([...list, ...newHistories]));
        setBillingSchedules((list) => uniqueSortSchedules([...list, ...newSchedules]));
        setEndDate(date);
        sortList();
    };

    return {
        startDate,
        endDate,
        groupedBillingList,
        billingHistories,
        billingSchedules,
        initRangeDate,
        updateStartDate,
        updateEndDate,
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
