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
import { useHashTab } from '^hooks/useHashTab';

export const OrgBankAccountShowPage = memo(function OrgBankAccountShowPage() {
    const orgId = useOrgIdParam();
    const tabs = ['구독', '결제', '카드'];
    const {activeTabIndex, setActiveTabIndex} = useHashTab({tabs});

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
                        tabs={tabs}
                    />
                </div>

                {/* 구독탭 */}
                {activeTabIndex == 0 && (
                    <div className="grid grid-cols-10">
                        <div className="col-span-7 pr-4">
                            <SubscriptionListOfBankAccountTabContent />
                        </div>

                        <div className="col-span-3 border-l border-gray-300 text-14">
                            <BankAccountInformationPanel />
                        </div>
                    </div>
                )}

                {/* 결제탭 */}
                {activeTabIndex == 1 && <BillingHistoryListOfBankAccountTabContent />}

                {/* 카드탭 */}
                {activeTabIndex == 2 && (
                    <div className="grid grid-cols-10">
                        <div className="col-span-7 pr-4">
                            <CreditCardListOfBankAccountTabContent />
                        </div>

                        <div className="col-span-3 border-l border-gray-300 text-14">
                            <BankAccountInformationPanel />
                        </div>
                    </div>
                )}
            </main>
        </ShowPage>
    );
});
