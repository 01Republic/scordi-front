import React, {memo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {BankAccountProfilePanel} from './BankAccountProfilePanel';
import {BankAccountActionPanel} from './BankAccountActionPanel';
import {BankAccountInformationPanel} from './BankAccountInformationPanel';
import {CreditCardListOfBankAccountTabContent} from './CreditCardListOfBankAccountTabContent';
import {SubscriptionListOfBankAccountTabContent} from './SubscriptionListOfBankAccountTabContent';
import {BillingHistoryListOfBankAccountTabContent} from './BillingHistoryListOfBankAccountTabContent';
import { TabConfig, useQueryTab } from '^hooks/useQueryTab';

const SubscriptionTabContent = () => (
    <div className="grid grid-cols-10">
        <div className="col-span-7 pr-4">
            <SubscriptionListOfBankAccountTabContent />
        </div>

        <div className="col-span-3 border-l border-gray-300 text-14">
            <BankAccountInformationPanel />
        </div>
    </div>
);

const PaymentTabContent = () => (   
    <BillingHistoryListOfBankAccountTabContent />
);

const CardTabContent = () => (
    <div className="grid grid-cols-10">
        <div className="col-span-7 pr-4">
            <CreditCardListOfBankAccountTabContent />
        </div>

        <div className="col-span-3 border-l border-gray-300 text-14">
            <BankAccountInformationPanel />
        </div>
    </div>
);

export const OrgBankAccountShowPage = memo(function OrgBankAccountShowPage() {
    const orgId = useOrgIdParam();
    const tabConfig: TabConfig[] = [
        { id: 'subscription', label: '구독', component: SubscriptionTabContent },
        { id: 'payment', label: '결제', component: PaymentTabContent },
        { id: 'card', label: '카드', component: CardTabContent },
    ];

    const {activeTabIndex, setActiveTabIndex, activeTab} = useQueryTab({tabs: tabConfig, paramKey: 'tab', defaultTab: 'subscription'});

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '결제수단 (계좌)', active: false, href: OrgBankAccountListPageRoute.path(orgId)},
                {text: '계좌 상세', active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    <BankAccountProfilePanel />
                </div>

                <BankAccountActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={tabConfig.map((tab) => tab.label)}
                    />
                </div>

                {activeTab.component && <activeTab.component />}
            </main>
        </ShowPage>
    );
});
