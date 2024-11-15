import React, {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {NewAppModal} from '^v3/share/modals/NewAppModal';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {SubscriptionsPanel} from './mobile/SubscriptionsPanel';
import {SubscriptionLoader} from './SubscriptionLoader';
import {SummarySection} from './SummarySection';
import {SubscriptionListPageTitle} from './SubscriptionListPageTitle';
import {SubscriptionListSection} from './SubscriptionListSection';
import {SubscriptionDetailModal} from './_localModals';
import {NewBillingHistoryModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/NewBillingHistoryModal';
import {SummarySectionV2} from './SummarySection/v2';
import {BillingHistoryDetailModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/BillingHistoryDetailModal';
import {NewSubscriptionModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/NewSubscriptionModal';
import {NewCardModalV2} from '^v3/share/modals/NewCardModal/NewCardModalV2';

const MODALS: ReactComponentLike[] = [
    NewAppModal,
    SubscriptionDetailModal,
    NewSubscriptionModalInAppShow,
    BillingHistoryDetailModalInAppShow,
    NewBillingHistoryModalInAppShow,
    TeamMemberShowModal,
    AccountListModal,
    InvoiceAccountSelectModal,
    NewCardModalV2,
];

export const V3OrgAppsPage = memo(() => {
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        return (
            <V3ListPageLayout activeTabIndex={LNBIndex.Subscriptions} modals={MODALS}>
                <SubscriptionListPageTitle />
                <SubscriptionLoader />
                {/*<SummarySection />*/}
                <SummarySectionV2 />
                <SubscriptionListSection />
            </V3ListPageLayout>
        );
    } else {
        return (
            <V3MainLayoutMobile title="구독리스트" activeTabIndex={BottomTabIndex.HOME} modals={MODALS}>
                <SubscriptionsPanel />
            </V3MainLayoutMobile>
        );
    }
});
V3OrgAppsPage.displayName = 'V3OrgAppsPage';
