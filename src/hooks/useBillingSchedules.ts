import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {BillingScheduleShallowDto as ScheduleDto, GetBillingSchedulesParams} from '^types/billing.type';
import {getBillingSchedules} from '^api/billing.api';
import {
    getBillingSchedulesQuery,
    orgBillingSchedulesQueryV3Atom,
    orgBillingSchedulesResultV3Atom,
} from '^atoms/billingSchedules.atom';
import {Paginated} from '^types/utils/paginated.dto';
import {useState} from 'react';

export const useBillingSchedules = () => useRecoilValue(getBillingSchedulesQuery);

interface UseBillingSchedulesOption {
    resultAtom: RecoilState<Paginated<ScheduleDto>>;
    queryAtom: RecoilState<GetBillingSchedulesParams>;
}

export const useBillingSchedulesV3 = (option?: UseBillingSchedulesOption) => {
    const {resultAtom, queryAtom} = option || {};
    const [result, setResult] = useRecoilState(resultAtom || orgBillingSchedulesResultV3Atom);
    const [query, setQuery] = useRecoilState(queryAtom || orgBillingSchedulesQueryV3Atom);
    const [isLoading, setIsLoading] = useState(false);

    async function search(params: GetBillingSchedulesParams) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        setIsLoading(true);
        const data = await getBillingSchedules(params).then((res) => res.data);
        setResult(data);
        setQuery(params);
        setIsLoading(false);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage, isLoading};
};
