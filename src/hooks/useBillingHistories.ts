import {useRecoilState, useRecoilValue} from 'recoil';
import {
    getBillingHistoriesQuery,
    getBillingHistoryQuery,
    getBillingSchedulesQuery,
    orgBillingHistoriesQueryV3Atom,
    orgBillingHistoriesResultV3Atom,
    orgBillingSchedulesQueryV3Atom,
    orgBillingSchedulesResultV3Atom,
} from '^atoms/billingHistories.atom';
import {getBillingHistories, getBillingSchedules} from '^api/billing.api';
import {BillingHistoryDto, GetBillingHistoriesParams, GetBillingSchedulesParams} from '^types/billing.type';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';
import {useState} from 'react';

export const useBillingSchedules = () => useRecoilValue(getBillingSchedulesQuery);
export const useBillingHistories = () => useRecoilValue(getBillingHistoriesQuery);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);

export const useBillingHistoriesV3 = () => {
    const [result, setResult] = useRecoilState(orgBillingHistoriesResultV3Atom);
    const [query, setQuery] = useRecoilState(orgBillingHistoriesQueryV3Atom);
    const [isLoading, setIsLoading] = useState(false);

    async function search(params: GetBillingHistoriesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        setIsLoading(true);
        const data = await getBillingHistories(params).then((res) => res.data);
        setResult(data);
        setQuery(params);
        setIsLoading(false);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage, isLoading};
};

export const useBillingSchedulesV3 = () => {
    const [result, setResult] = useRecoilState(orgBillingSchedulesResultV3Atom);
    const [query, setQuery] = useRecoilState(orgBillingSchedulesQueryV3Atom);

    async function search(params: GetBillingSchedulesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await getBillingSchedules(params).then((res) => res.data);
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
//         (productId: number, page: number, force?: boolean) => {
//             if (!force && pagination.currentPage === page) return;
//
//             const params: GetBillingHistoriesParams = {
//                 where: {productId},
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
    buildParams: (subscriptionId, page, pagination) => ({
        where: {subscriptionId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: pagination.itemsPerPage,
    }),
    request: (_, params) => getBillingHistories(params),
});
