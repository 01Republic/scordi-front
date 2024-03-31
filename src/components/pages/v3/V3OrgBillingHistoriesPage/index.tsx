import React, {memo} from 'react';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {BillingHistoriesPageBody} from './BillingHistoriesPageBody';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {MonthlyTotal} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyTotal';
import {MonthHandler} from './desktop/MonthHandler';
import {MonthlySummary} from './desktop/MonthlySummary';
import {CalendarOnDesktop} from './desktop/CalenderOnDesktop';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {DailyBillingHistoriesModal} from './modals/DailyBillingHistoriesModal';
import {MonthlyPaidAmountModal} from '^v3/V3OrgHomePage/MonthlyPaidAmountModal';
import {MonthlyRemainAmountModal} from '^v3/V3OrgHomePage/MonthlyRemainAmountModal';

export const V3OrgBillingHistoriesPage = memo(() => {
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        // PC size screen
        return (
            <V3MainLayout
                activeTabIndex={LNBIndex.Calendar}
                modals={[
                    MonthlyPaidAmountModal,
                    MonthlyRemainAmountModal,
                    DailyBillingHistoriesModal,
                    BillingHistoryDetailModal,
                ]}
            >
                <V3MainLayoutContainer>
                    <MonthHandler />

                    <div className="mb-6">
                        <p className="text-lg font-semibold mb-2">총 결제금액</p>
                        <MonthlyTotal />
                    </div>

                    <MonthlySummary />

                    <div className="">
                        <CalendarOnDesktop />
                    </div>
                </V3MainLayoutContainer>
            </V3MainLayout>
        );
    } else {
        // Mobile size screen
        return (
            <V3MainLayoutMobile
                title="일정"
                activeTabIndex={BottomTabIndex.HISTORIES}
                modals={[BillingHistoryDetailModal]}
            >
                <BillingHistoriesPageBody />
            </V3MainLayoutMobile>
        );
    }
});
