import React, {memo, useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {subscriptionSubjectAtom} from './atom';
import {SubscriptionProfilePanel} from './SubscriptionProfilePanel';
import {SubscriptionInfoTab} from './SubscriptionInfoTab';
import {SubscriptionPaymentTab} from './SubscriptionPaymentTab';
import {SubscriptionMemberTab} from './SubscriptionMemberTab';
import {SubscriptionActionPanel} from './SubscriptionActionPanel';
import { useQueryTab, TabConfig } from '^hooks/useQueryTab';

export const OrgSubscriptionDetailPage = memo(() => {
    const orgId = useOrgIdParam();
    const id = useIdParam('subscriptionId');

    // useMemo로 tabConfig 메모이제이션
    const tabConfig: TabConfig[] = useMemo(() => [
        { id: 'member', label: '멤버', component: SubscriptionMemberTab },
        { id: 'payment', label: '결제', component: SubscriptionPaymentTab },
        { id: 'setting', label: '설정', component: SubscriptionInfoTab }
    ], []);

    const {activeTabIndex, setActiveTabIndex, activeTab} = useQueryTab({
        tabs: tabConfig,
        paramKey: 'tab',
        defaultTab: 'member'
    });
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    return (
        <ShowPage
            breadcrumb={[
                '구독',
                {text: '구독 리스트', active: false, href: OrgSubscriptionListPageRoute.path(orgId)},
                {text: subscription?.product.name() || '', active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    {subscription && <SubscriptionProfilePanel subscription={subscription} />}
                </div>
                <SubscriptionActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={tabConfig.map(tab => tab.label)}
                    />
                </div>

                {activeTab.component && <activeTab.component />}
            </main>
        </ShowPage>
    );
});
