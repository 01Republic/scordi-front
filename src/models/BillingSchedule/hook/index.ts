import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {getBillingSchedules} from '^models/BillingSchedule/api';
import {
    getBillingSchedulesQuery,
    orgBillingSchedulesQueryV3Atom,
    orgBillingSchedulesResultV3Atom,
} from '^models/BillingSchedule/atom';
import {Paginated} from '^types/utils/paginated.dto';
import {useState} from 'react';
import {BillingScheduleShallowDto as ScheduleDto, GetBillingSchedulesParams} from '^models/BillingSchedule/type';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {GetBillingHistoriesParams} from '^models/BillingHistory/type';

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

// 대시보드 - 올해의 구독 현황 섹션 월 별 구독 예상 금액 리스트 불러오기
export const useYearlySubscriptionScheduleLogInDashboard = (orgId: number) => {
    const getThisYear = new Date().getFullYear();
    // const getThisYear = 2024;

    const query: GetBillingSchedulesParams = {
        where: {organizationId: orgId},
        startDate: `${String(getThisYear)}`,
        endDate: `${String(getThisYear)}`,
    };
    return useQuery({
        queryKey: ['monthlySubscriptionList', orgId],
        queryFn: () => getBillingSchedules({...query, order: {billingDate: 'ASC'}}).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};
