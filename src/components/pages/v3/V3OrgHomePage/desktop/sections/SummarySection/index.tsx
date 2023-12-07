import React, {memo, useEffect} from 'react';
import {Panel} from '^v3/V3OrgHomePage/desktop/Panel';
import {Section} from '^v3/V3OrgHomePage/desktop/Section';
import {SummaryItem} from './SummaryItem';
import {MonthHandler} from '^v3/V3OrgBillingHistoriesPage/desktop/MonthHandler';
import {useFocusedMonth} from '^v3/V3OrgHomePage/feature/useFocusedMonth';
import {MonthlyTotal} from '^v3/V3OrgHomePage/desktop/sections/SummarySection/MonthlyTotal';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {subscriptionsState} from '^models/Subscription/atom';
import {orgIdParamState} from '^atoms/common';

export const SummarySection = memo(function SummarySection() {
    const {focusedMonth} = useFocusedMonth();
    const {result, search: getSubscriptions} = useSubscriptionsV2();
    const Subscription = SubscriptionManager.init(result.items || []);
    const setSubscriptions = useSetRecoilState(subscriptionsState);
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        getSubscriptions({
            where: {organizationId: orgId},
            relations: ['master'],
            itemsPerPage: 0,
        }).then((res) => res && setSubscriptions(res.items));
    }, [orgId]);

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
                            <SummaryItem title={'유료 구독'} value={Subscription.paid().length} />
                            <SummaryItem title={'무료 구독'} value={Subscription.free().length} />
                            <SummaryItem title={'결제 예정'} value={Subscription.pending().length} />
                            {/*<SummaryItem title={'결제 완료'} />*/}
                            <SummaryItem title={'결제 실패'} value={Subscription.failed().length} />
                            {/*(블러 처리 하고 유료플랜)*/}
                            <SummaryItem title={'이상 결제'} value="?" covered />
                            {/*(블러 처리 하고 유료플랜)*/}
                            <SummaryItem title={'무료플랜 만료'} value="?" covered />
                        </div>
                    </Panel>
                </div>
            </div>
        </Section>
    );
});
