import {useState} from 'react';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {getBillingHistories} from '^api/billing.api';
import {
    getBillingHistoriesQuery,
    getBillingHistoryQuery,
    orgBillingHistoriesQueryV3Atom,
    orgBillingHistoriesResultV3Atom,
} from '^atoms/billingHistories.atom';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

export const useBillingHistories = () => useRecoilValue(getBillingHistoriesQuery);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);

interface UseBillingHistoriesOption {
    resultAtom: RecoilState<Paginated<BillingHistoryDto>>;
    queryAtom: RecoilState<GetBillingHistoriesParams>;
}

export const useBillingHistoriesV3 = (option?: UseBillingHistoriesOption) => {
    const {resultAtom, queryAtom} = option || {};
    const [result, setResult] = useRecoilState(resultAtom || orgBillingHistoriesResultV3Atom);
    const [query, setQuery] = useRecoilState(queryAtom || orgBillingHistoriesQueryV3Atom);
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

// This is real !! (deprecated)
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
