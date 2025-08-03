import {useOrgIdParam} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {GoogleGmailOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useInvoiceAccountSync} from '^models/InvoiceAccount/hook';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {useCurrentInvoiceAccount} from './atom';
import {InvoiceAccountActionPanel} from './InvoiceAccountActionPanel';
import {InvoiceAccountInformationPanel} from './InvoiceAccountInformationPanel';
import {InvoiceAccountProfilePanel} from './InvoiceAccountProfilePanel';
import {BillingHistoryListOfInvoiceAccountTabContent, SubscriptionListOfInvoiceAccountTabContent} from './tab-panes';

export const OrgInvoiceAccountShowPage = memo(() => {
    const {t} = useTranslation('assets');
    const orgId = useOrgIdParam();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const {renewAccountWithConfirm} = useInvoiceAccountSync();

    return (
        <ShowPage
            breadcrumb={[
                t('common.asset') as string,
                {text: t('invoiceAccount.title') as string, href: OrgInvoiceAccountListPageRoute.path(orgId)},
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
                        tabs={[
                            t('invoiceAccount.show.tabs.subscriptions') as string,
                            t('invoiceAccount.show.tabs.billingHistory') as string,
                        ]}
                    />

                    {/* right side */}
                    <div>
                        <div></div>
                    </div>
                </div>

                {activeTabIndex === 0 && (
                    <div className="grid grid-cols-10">
                        <div className="col-span-7 pr-4">
                            <SubscriptionListOfInvoiceAccountTabContent />
                        </div>

                        <div className="col-span-3 border-l border-gray-300 text-14">
                            <InvoiceAccountInformationPanel />
                        </div>
                    </div>
                )}
                {activeTabIndex === 1 && <BillingHistoryListOfInvoiceAccountTabContent />}
            </main>

            <div className="hidden">
                <GoogleGmailOAuthButton
                    onCode={(code) => {
                        if (!currentInvoiceAccount) return;
                        renewAccountWithConfirm(orgId, currentInvoiceAccount, {code});
                    }}
                >
                    <button id="invoice-email-token-refresh-button">
                        {t('invoiceAccount.show.actions.sync') as string}
                    </button>
                </GoogleGmailOAuthButton>
            </div>
        </ShowPage>
    );
});
