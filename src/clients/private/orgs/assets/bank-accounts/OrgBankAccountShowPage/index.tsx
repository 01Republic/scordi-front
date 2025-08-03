import {useOrgIdParam} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {BankAccountActionPanel} from './BankAccountActionPanel';
import {BankAccountInformationPanel} from './BankAccountInformationPanel';
import {BankAccountProfilePanel} from './BankAccountProfilePanel';
import {BillingHistoryListOfBankAccountTabContent} from './BillingHistoryListOfBankAccountTabContent';
import {CreditCardListOfBankAccountTabContent} from './CreditCardListOfBankAccountTabContent';
import {SubscriptionListOfBankAccountTabContent} from './SubscriptionListOfBankAccountTabContent';

export const OrgBankAccountShowPage = memo(function OrgBankAccountShowPage() {
    const {t} = useTranslation('assets');
    const orgId = useOrgIdParam();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage
            breadcrumb={[
                t('common.asset') as string,
                {
                    text: t('bankAccount.title') as string,
                    active: false,
                    href: OrgBankAccountListPageRoute.path(orgId),
                },
                {text: t('bankAccount.show.title') as string, active: true},
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
                        tabs={[
                            t('bankAccount.show.tabs.subscriptions') as string,
                            t('bankAccount.show.tabs.billingHistory') as string,
                            t('bankAccount.show.tabs.creditCards') as string,
                        ]}
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
