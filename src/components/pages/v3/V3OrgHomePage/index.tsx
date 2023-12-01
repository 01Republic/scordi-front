import React, {memo} from 'react';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {useRecoilValue} from 'recoil';
import {useOnResize2} from '^components/util/onResize2';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {SubscriptionsPanel} from './mobile/SubscriptionsPanel';
import {InvoiceAccountsPanel} from './mobile/InvoiceAccountsPanel';
import {SummaryHeaderPanel} from './mobile/SummaryHeaderPanel';
import {ApplyNotFoundProduct} from '^v3/share/sections/ApplyNotFoundProduct';
import {BillingHistoriesPageModal} from '^v3/V3OrgBillingHistoriesPage/modals/BillingHistoriesPageModal';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {currentUserAtom} from '^models/User/atom';
import {TopNavProfileButton} from '^v3/share/TobNav/TopNavProfileButton';
import {TopNavOrgSelect} from '^v3/share/TobNav/TopNavOrgSelect';
import {RenewInvoiceAccountModalMobile} from './RenewInvoiceAccountModal/mobile';
import {MonthlyPaidAmountModal} from './MonthlyPaidAmountModal';
import {MonthlyRemainAmountModal} from './MonthlyRemainAmountModal';
import {CardsPanel} from './mobile/CardsPanel';
import {CardFormModalGroup} from '../V3OrgCardListPage/modals/CardFormModalGroup';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {TeamMemberModal, TeamMemberCreateModal} from './desktop/modals';
import {
    SummarySection,
    MemberListSection,
    CardListSection,
    AccountListSection,
    SubscriptionsSection,
} from './desktop/sections';
import {HeaderSection} from '^v3/V3OrgHomePage/desktop/sections/HeaderSection';
import {NewAppModal} from '^components/pages/v3/share/modals/NewAppModal';
import {SubscriptionTrModalSet} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/SubscriptionTrModalSet';
import {NewTeamMemberModal} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/modals/NewTeamMemberModal';

export const V3OrgHomePage = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        // PC size screen
        return (
            <V3MainLayout
                activeTabIndex={LNBIndex.Dashboard}
                modals={[TeamMemberModal, TeamMemberCreateModal, NewTeamMemberModal, SubscriptionTrModalSet]}
            >
                <V3MainLayoutContainer>
                    <HeaderSection />
                    <SummarySection />
                    <MemberListSection />
                    {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">*/}
                    {/*    <CardListSection />*/}
                    {/*    <AccountListSection />*/}
                    {/*</div>*/}
                    <SubscriptionsSection />
                </V3MainLayoutContainer>
            </V3MainLayout>
        );
    } else {
        // Mobile size screen
        return (
            <V3MainLayoutMobile
                title={
                    <img
                        src="/images/logo/scordi/png/text/text-black.png"
                        alt="Scordi LOGO"
                        className="h-[15px]"
                        loading="lazy"
                        draggable={false}
                    />
                }
                activeTabIndex={BottomTabIndex.HOME}
                modals={[
                    BillingHistoriesPageModal,
                    BillingHistoryDetailModal,
                    NewAppModal,
                    RenewInvoiceAccountModalMobile,
                    MonthlyPaidAmountModal,
                    MonthlyRemainAmountModal,
                    CardFormModalGroup,
                ]}
                topRightButtons={currentUser?.isAdmin ? [TopNavOrgSelect, TopNavProfileButton] : []}
            >
                {/* 월간 요약 패널 */}
                <SummaryHeaderPanel />

                {/* 이용중인 앱 */}
                <SubscriptionsPanel />

                {/* 결제 수신 계정 */}
                <InvoiceAccountsPanel />

                {/* 카드 패널 */}
                <CardsPanel />

                {/* 하단 여백 */}
                <MobileSection.Item noStyle className="px-4 mb-16">
                    {/* 스코디에 제보하기 */}
                    <ApplyNotFoundProduct />
                </MobileSection.Item>
            </V3MainLayoutMobile>
        );
    }
});
