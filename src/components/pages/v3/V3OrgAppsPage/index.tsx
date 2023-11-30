import React, {memo} from 'react';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {SubscriptionLoader} from './SubscriptionLoader';
import {SummarySection} from './SummarySection';
import {SubscriptionListPageTitle} from './SubscriptionListPageTitle';
import {SubscriptionListSection} from './SubscriptionListSection';
import {SubscriptionTrModalSet} from './SubscriptionListSection/SubscriptionTable/SubscriptionTr/SubscriptionTrModalSet';

export const V3OrgAppsPage = memo(() => {
    return (
        <V3ListPageLayout activeTabIndex={LNBIndex.Subscriptions} modals={[SubscriptionTrModalSet]}>
            <SubscriptionListPageTitle />
            <SubscriptionLoader />
            <SummarySection />
            <SubscriptionListSection />
        </V3ListPageLayout>
    );
});
V3OrgAppsPage.displayName = 'V3OrgAppsPage';
