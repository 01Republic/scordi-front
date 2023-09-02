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

export const V3OrgHomePage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
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
            <V3MainLayoutMobile title={currentOrg?.name} activeTabIndex={0}>
                <InvoiceAccountAddingAlert />
                <MobileSection.List>
                    <SummaryHeaderPanel />
                    <SubscriptionsPanel />
                    <InvoiceAccountsPanel />
                    <MobileSection.Item noStyle className="px-4 mb-16">
                        <ApplyNotFoundProduct />
                    </MobileSection.Item>
                </MobileSection.List>
                <NewInvoiceAccountModal />
            </V3MainLayoutMobile>
        );
    }
});
