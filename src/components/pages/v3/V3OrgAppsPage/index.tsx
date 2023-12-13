import React, {memo} from 'react';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {SubscriptionLoader} from './SubscriptionLoader';
import {SummarySection} from './SummarySection';
import {SubscriptionListPageTitle} from './SubscriptionListPageTitle';
import {SubscriptionListSection} from './SubscriptionListSection';
import {useOnResize2} from '^components/util/onResize2';
import {AppShowPageModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {SubscriptionsPanel} from '^v3/V3OrgAppsPage/mobile/SubscriptionsPanel';

export const V3OrgAppsPage = memo(() => {
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        return (
            <V3ListPageLayout activeTabIndex={LNBIndex.Subscriptions} modals={[AppShowPageModal, AccountListModal]}>
                <SubscriptionListPageTitle />
                <SubscriptionLoader />
                <SummarySection />
                <SubscriptionListSection />
            </V3ListPageLayout>
        );
    } else {
        return (
            <V3MainLayoutMobile
                title="구독리스트"
                activeTabIndex={BottomTabIndex.HOME}
                modals={[AppShowPageModal, AccountListModal]}
            >
                <SubscriptionsPanel />
            </V3MainLayoutMobile>
        );
    }
});
V3OrgAppsPage.displayName = 'V3OrgAppsPage';
