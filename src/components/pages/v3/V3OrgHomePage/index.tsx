import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {V3MainLayout, V3MainLayoutContainer} from '^v3//layouts/V3MainLayout';
import {V3MainLayoutMobile} from '^v3/layouts/V3MainLayout.mobile';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {InvoiceAccountAddingButton} from './InvoiceAccountAddingButton';
import {NewInvoiceAccountModal} from './NewInvoiceAccountModal';
import {InvoiceSearchControllerSection} from './InvoiceSearchControllerSection';
import {InvoiceSummarySection} from './InvoiceSummarySection';
import {InvoiceTabNav} from './InvoiceTabNav';
import {InvoiceTable} from './InvoiceTable';
import {useTranslation} from 'next-i18next';
import {InvoiceAccountAddingAlert} from '^v3/V3OrgHomePage/InvoiceAccountAddingAlert';
import {useOnResize2} from '^components/util/onResize2';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {SubscriptionsPanel} from '^v3/V3OrgHomePage/mobile/SubscriptionsPanel';
import {InvoiceAccountsPanel} from '^v3/V3OrgHomePage/mobile/InvoiceAccountsPanel';
import {SummaryHeaderPanel} from '^v3/V3OrgHomePage/mobile/SummaryHeaderPanel';
import {ApplyNotFoundProduct} from '^v3/share/sections/ApplyNotFoundProduct';
import {BillingHistoriesPageModal} from '^v3/V3OrgBillingHistoriesPage/modals/BillingHistoriesPageModal';
import {BillingHistoryDetailModal} from '^v3/share/modals/BillingHistoryDetailModal';
import {NewInvoiceAccountModalMobile} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/mobile';
import {BottomTabIndex} from '^v3/share/BottomNavMobile';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {TopNavProfileButton} from '^v3/share/TobNav/TopNavProfileButton';
import {TopNavOrgSelect} from '^v3/share/TobNav/TopNavOrgSelect';
import {RenewInvoiceAccountModalMobile} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/mobile';
import {MonthlyPaidAmountModal} from '^v3/V3OrgHomePage/MonthlyPaidAmountModal';
import {MonthlyRemainAmountModal} from '^v3/V3OrgHomePage/MonthlyRemainAmountModal';
import {CardsPanel} from './mobile/CardsPanel';
import {CardFormModalGroup} from '../V3OrgCardListPage/modals/CardFormModalGroup';

export const V3OrgHomePage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const currentUser = useRecoilValue(currentUserAtom);
    const {t} = useTranslation('org-home');
    const {isDesktop} = useOnResize2();

    if (isDesktop) {
        // PC size screen
        return (
            <V3MainLayout>
                <InvoiceAccountAddingAlert />
                {currentOrg && (
                    <V3MainLayoutContainer>
                        <section className={`${styles.greeting} flex items-center justify-between mb-20`}>
                            <div className="flex items-center gap-3">
                                <img src="/images/v3/home-calendar.png" width={80} />
                                <h1
                                    className="max-w-[24rem]"
                                    style={{wordBreak: 'keep-all'}}
                                    dangerouslySetInnerHTML={{__html: t('heading', {orgName: currentOrg.name})}}
                                />
                            </div>

                            <InvoiceAccountAddingButton />
                        </section>

                        <InvoiceSearchControllerSection />
                        <InvoiceSummarySection />
                        <InvoiceTabNav />
                        <InvoiceTable />
                    </V3MainLayoutContainer>
                )}
                <NewInvoiceAccountModal />
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
                    NewInvoiceAccountModalMobile,
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
