import React, {memo, useMemo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {useInvoiceAccountSync} from '^models/InvoiceAccount/hook';
import {GoogleGmailOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {InvoiceAccountProfilePanel} from './InvoiceAccountProfilePanel';
import {InvoiceAccountActionPanel} from './InvoiceAccountActionPanel';
import {InvoiceAccountInformationPanel} from './InvoiceAccountInformationPanel';
import {BillingHistoryListOfInvoiceAccountTabContent, SubscriptionListOfInvoiceAccountTabContent} from './tab-panes';
import {useCurrentInvoiceAccount} from './atom';
import {TabConfig, useQueryTab} from '^hooks/useQueryTab';

const SubscriptionTabContent = () => (
    <div className="grid grid-cols-10">
        <div className="col-span-7 pr-4">
            <SubscriptionListOfInvoiceAccountTabContent />
        </div>

        <div className="col-span-3 border-l border-gray-300 text-14">
            <InvoiceAccountInformationPanel />
        </div>
    </div>
);

const PaymentTabContent = () => <BillingHistoryListOfInvoiceAccountTabContent />;

export const OrgInvoiceAccountShowPage = memo(() => {
    const orgId = useOrgIdParam();
    const tabConfig: TabConfig[] = useMemo(
        () => [
            {id: 'subscription', label: '구독', component: SubscriptionTabContent},
            {id: 'payment', label: '청구서', component: PaymentTabContent},
        ],
        [],
    );
    const {activeTabIndex, setActiveTabIndex, activeTab} = useQueryTab({
        tabs: tabConfig,
        paramKey: 'tab',
        defaultTab: 'subscription',
    });
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const {renewAccountWithConfirm} = useInvoiceAccountSync();

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '청구서 메일', href: OrgInvoiceAccountListPageRoute.path(orgId)},
                {text: `${currentInvoiceAccount?.email}`, active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    <InvoiceAccountProfilePanel />
                </div>

                {currentInvoiceAccount && <InvoiceAccountActionPanel invoiceAccount={currentInvoiceAccount} />}
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={tabConfig.map((tab) => tab.label)}
                    />

                    {/* right side */}
                    <div>
                        <div></div>
                    </div>
                </div>

                {activeTab.component && <activeTab.component />}
            </main>

            <div className="hidden">
                <GoogleGmailOAuthButton
                    onCode={(code) => {
                        if (!currentInvoiceAccount) return;
                        renewAccountWithConfirm(orgId, currentInvoiceAccount, {code});
                    }}
                >
                    <button id="invoice-email-token-refresh-button">지메일 계정 연동 로그인 트리거</button>
                </GoogleGmailOAuthButton>
            </div>
        </ShowPage>
    );
});
