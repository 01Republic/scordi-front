import React, {memo} from 'react';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {SubscriptionTable} from '^v3/V3OrgAppsPage/SubscriptionTable';
import {SubscriptionLoader} from '^v3/V3OrgAppsPage/SubscriptionLoader';
import {SummarySection} from '^v3/V3OrgAppsPage/SummarySection';
import {SubscriptionListPageTitle} from '^v3/V3OrgAppsPage/SubscriptionListPageTitle';
import {AppShowPageModal} from '^v3/V3OrgAppShowPage/modals';

export const V3OrgAppsPage = memo(() => {
    return (
        <V3ListPageLayout activeTabIndex={LNBIndex.Subscriptions}>
            <SubscriptionListPageTitle />
            <SubscriptionLoader />
            <SummarySection />

            <section>
                <SubscriptionTable />
            </section>
            <AppShowPageModal />
        </V3ListPageLayout>
    );
});
V3OrgAppsPage.displayName = 'V3OrgAppsPage';
