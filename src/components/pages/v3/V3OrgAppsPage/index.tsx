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
import {TeamMemberCreateModal} from '^v3/V3OrgHomePage/_localModals/NewTeamMemberModal/NewTeamMemberCreateModal';

import {SubscriptionsPanel} from './mobile/SubscriptionsPanel';
import {SubscriptionLoader} from './SubscriptionLoader';
import {SummarySection} from './SummarySection';
import {SubscriptionListPageTitle} from './SubscriptionListPageTitle';
import {SubscriptionListSection} from './SubscriptionListSection';
import {SubscriptionDetailModal} from './_localModals';
import {NewTeamMemberInviteModal} from '^v3/V3OrgHomePage/_localModals/NewTeamMemberModal/NewTeamMemberInviteModal';
import {NewBillingHistoryModalInAppShow} from '^v3/V3OrgAppsPage/_localModals/NewBillingHistoryModal';

const MODALS: ReactComponentLike[] = [
    NewAppModal,
    SubscriptionDetailModal,
    NewBillingHistoryModalInAppShow,
    BillingHistoryDetailModal,
    TeamMemberShowModal,
    AccountListModal,
    TeamMemberCreateModal,
    NewTeamMemberInviteModal,
    InvoiceAccountSelectModal,
];

export const V3OrgAppsPage = memo(() => {
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        return (
            <V3ListPageLayout activeTabIndex={LNBIndex.Subscriptions} modals={MODALS}>
                <SubscriptionListPageTitle />
                <SubscriptionLoader />
                <SummarySection />
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
