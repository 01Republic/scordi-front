import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
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

export const OrgInvoiceAccountShowPage = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const {renewAccountWithConfirm} = useInvoiceAccountSync();

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '청구서 메일', href: OrgInvoiceAccountListPageRoute.path(orgId)},
                {text: `${currentInvoiceAccount?.title}`, active: true},
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
                        tabs={['구독', '청구서']}
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
                    <button id="invoice-email-token-refresh-button">지메일 계정 연동 로그인 트리거</button>
                </GoogleGmailOAuthButton>
            </div>
        </ShowPage>
    );
});
