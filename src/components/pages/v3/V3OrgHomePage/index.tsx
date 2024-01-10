import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {useOnResize2} from '^components/util/onResize2';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ApplyNotFoundProduct} from '^v3/share/sections/ApplyNotFoundProduct';
import {currentUserAtom} from '^models/User/atom';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {TopNavProfileButton} from '^v3/share/TobNav/TopNavProfileButton';
import {TopNavOrgSelect} from '^v3/share/TobNav/TopNavOrgSelect';
import {SubscriptionsPanel} from './mobile/SubscriptionsPanel';
import {InvoiceAccountsPanel} from './mobile/InvoiceAccountsPanel';
import {SummaryHeaderPanel} from './mobile/SummaryHeaderPanel';
import {CardsPanel} from './mobile/CardsPanel';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {HeaderSection} from './desktop/sections/HeaderSection';

import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {NewAppModal} from '^v3/share/modals/NewAppModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {NewCardModalV2} from '^v3/share/modals/NewCardModal/NewCardModalV2';

import {BillingHistoriesPageModal} from '^v3/V3OrgBillingHistoriesPage/modals/BillingHistoriesPageModal';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

// import {TeamMemberCreateModal} from './TeamMemberCreateModal';
import {MonthlyPaidAmountModal} from './MonthlyPaidAmountModal';
import {MonthlyRemainAmountModal} from './MonthlyRemainAmountModal';
import {RenewInvoiceAccountModalMobile} from './RenewInvoiceAccountModal/mobile';

import {SummarySection, MemberListSection, SubscriptionsSection} from './desktop/sections';
import {SubscriptionDetailModal, NewBillingHistoryModalInDashBoard} from './_localModals';
import {NewTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal';

export const V3OrgHomePage = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        // PC size screen
        return (
            <V3MainLayout
                activeTabIndex={LNBIndex.Dashboard}
                modals={[
                    SubscriptionDetailModal, // 구독상세모달
                    TeamMemberShowModal, // 멤버상세모달
                    AccountListModal,
                    NewBillingHistoryModalInDashBoard, // 결제내역추가모달
                    BillingHistoryDetailModal, // 결제내역상세모달
                    InvoiceAccountSelectModal,
                    NewTeamMemberModal, // 멤버추가모달
                ]}
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
                    BillingHistoriesPageModal, // 내역페이지 모달 아마?
                    SubscriptionDetailModal,
                    BillingHistoryDetailModal,
                    NewAppModal,
                    RenewInvoiceAccountModalMobile,
                    MonthlyPaidAmountModal,
                    MonthlyRemainAmountModal,
                    NewCardModalV2,
                    InvoiceAccountSelectModal,
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
