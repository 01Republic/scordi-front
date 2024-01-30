import React, {memo, useEffect} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {SummaryItem} from './SummaryItem';
import {MonthHandler} from '^v3/V3OrgBillingHistoriesPage/desktop/MonthHandler';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {MonthlyTotal} from '^v3/V3OrgHomePage/desktop/sections/SummarySection/MonthlyTotal';
import {useDashBoardSubscriptionSummary} from '^models/SubscsriptionSummary/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const SummarySectionV2 = memo(function SummarySection() {
    const {focusedMonth} = useFocusedMonth();
    const {isLoading, index: indexSubscriptionSummary, result} = useDashBoardSubscriptionSummary();
    const {free, paying, active, canceled, expired, failed, paused, pending, total, none} = result;
    const organizationId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;

        indexSubscriptionSummary();
    }, [organizationId]);

    return (
        <Section>
            <div className="hidden">
                <MonthHandler />
            </div>
            <div className="grid grid-cols-1 items-center justify-between">
                <div className="col-span-1 pb-2 mb-6 hidden">
                    <h1 className="font-semibold text-gray-500 mb-2">
                        <span className="text-black">{focusedMonth ? focusedMonth.getMonth() + 1 : ''}월</span> 총 결제
                    </h1>
                    <MonthlyTotal />
                </div>

                <div className="col-span-1">
                    <Panel padding="compact">
                        <div className="w-full grid grid-cols-6 items-center justify-items-stretch">
                            {/*<SummaryItem title={'모든 구독'} />*/}
                            <SummaryItem title={'유료 구독'} value={paying} isLoading={isLoading} />
                            <SummaryItem title={'무료 구독'} value={free} isLoading={isLoading} />
                            <SummaryItem title={'결제 예정'} value={pending} isLoading={isLoading} />
                            {/*<SummaryItem title={'결제 완료'} />*/}
                            <SummaryItem title={'결제 실패'} value={failed} isLoading={isLoading} />
                            {/*(블러 처리 하고 유료플랜)*/}
                            <SummaryItem title={'이상 결제'} value="?" isLoading={isLoading} covered />
                            {/*(블러 처리 하고 유료플랜)*/}
                            <SummaryItem title={'무료플랜 만료'} value="?" isLoading={isLoading} covered />
                        </div>
                    </Panel>
                </div>
            </div>
        </Section>
    );
});
