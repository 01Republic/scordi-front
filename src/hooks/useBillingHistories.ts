import {useRecoilState, useRecoilValue} from 'recoil';
import {
    billingHistoriesState,
    billingSchedulesState,
    getBillingHistoriesParamsState,
    getBillingHistoriesQuery,
    getBillingHistoryQuery,
    getBillingSchedulesQuery,
    orgBillingHistoriesQueryV3Atom,
    orgBillingHistoriesResultV3Atom,
} from '^atoms/billingHistories.atom';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {calendarSelectedDateState} from '^atoms/calendarData.atom';
import {useCallback, useEffect, useState} from 'react';
import {dayAfter} from '^utils/dateTime';
import {getBillingHistories, getBillingSchedules} from '^api/billing.api';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

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

export const useBillingHistoriesV3 = () => {
    const [result, setResult] = useRecoilState(orgBillingHistoriesResultV3Atom);
    const [query, setQuery] = useRecoilState(orgBillingHistoriesQueryV3Atom);

    async function search(params: GetBillingHistoriesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await getBillingHistories(params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};

// export const useBillingHistoryList = () => {
//     const [items, setItems] = useRecoilState(billingHistoriesState);
//     const [pagination, setPagination] = useRecoilState(billingHistoryListPaginationAtom);
//     const [queryParams, setQueryParams] = useRecoilState(getBillingHistoriesParamsState);
//
//     const fetchItems = useCallback(
//         (applicationId: number, page: number, force?: boolean) => {
//             if (!force && pagination.currentPage === page) return;
//
//             const params: GetBillingHistoriesParams = {
//                 where: {applicationId},
//                 order: {id: 'DESC'},
//                 page,
//                 itemsPerPage: pagination.itemsPerPage,
//             };
//             if (!force && JSON.stringify(queryParams) === JSON.stringify(params)) return;
//
//             setQueryParams(params);
//             return getBillingHistories(params).then((res) => {
//                 setItems(res.data.items);
//                 setPagination(res.data.pagination);
//             });
//         },
//         [pagination, queryParams],
//     );
//
//     return {
//         items,
//         fetchItems,
//         pagination,
//     };
// };

// This is real !!
export const {paginatedListHook: useBillingHistoryList} = makePaginatedListHookWithAtoms<number, BillingHistoryDto>({
    subject: 'billingHistoryList',
    buildParams: (applicationId, page, pagination) => ({
        where: {applicationId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: pagination.itemsPerPage,
    }),
    request: (_, params) => getBillingHistories(params),
});
