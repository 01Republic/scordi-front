import {SubscriptionSummaryIndexDto} from '^models/SubscsriptionSummary/types';
import {subscriptionSummaryApi} from '^models/SubscsriptionSummary/api';
import {dashboardSubscriptionSummaryAtom, subscriptionListSummaryAtom} from '^models/SubscsriptionSummary/atom';
import {SummaryAtom} from '^hooks/useSummary';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {useState} from 'react';

// 대시보드 / 구독 요약
export const useDashBoardSubscriptionSummary = () => useSubscriptionSummaryIndex(dashboardSubscriptionSummaryAtom);

// 구독리스트 / 요약
export const useSubscriptionMenuSummaryV2 = () => useSubscriptionSummaryIndex(subscriptionListSummaryAtom);

export const useSubscriptionSummaryIndex = (atoms: SummaryAtom<SubscriptionSummaryIndexDto>) => {
    const {resultAtom, isLoadingAtom} = atoms;
    const organizationId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);

    async function index() {
        if (!organizationId || isNaN(organizationId) || isLoading) return;

        setIsLoading(true);

        return subscriptionSummaryApi
            .index({organizationId})
            .then((res) => {
                setResult(res.data);
                return res.data;
            })
            .finally(() => {
                setTimeout(() => setIsLoading(false), 200);
            });
    }

    return {result, isLoading, index};
};
