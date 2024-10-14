import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {invoiceAccountIdParamState, orgIdParamState} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {OrgInvoiceAccountListPageRoute} from '^pages/orgs/[id]/invoiceAccounts';
import {invoiceAccountSubjectAtom, useCurrentInvoiceAccount} from './atom';
import {InvoiceAccountProfilePanel} from './InvoiceAccountProfilePanel';
import {InvoiceAccountActionPanel} from './InvoiceAccountActionPanel';
import {InvoiceAccountInformationPanel} from './InvoiceAccountInformationPanel';
import {BillingHistoryListOfInvoiceAccountTabContent, SubscriptionListOfInvoiceAccountTabContent} from './tab-panes';
import {googleOAuth} from '^config/environments';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useInvoiceAccountSync} from '^models/InvoiceAccount/hook';

export const OrgInvoiceAccountShowPage = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [id, setId] = useRecoilState(invoiceAccountIdParamState);
    const {currentInvoiceAccount, findOne, setCurrentInvoiceAccount} = useCurrentInvoiceAccount();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {renewAccountWithConfirm} = useInvoiceAccountSync();
    // const currentInvoiceAccount = useRecoilValue(invoiceAccountSubjectAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!id || isNaN(id)) return;
        console.log('OrgInvoiceAccountShowPage.id', id);
        findOne(orgId, id);
    }, [orgId, id]);

    useEffect(() => {
        return () => {
            setId(NaN);
            setCurrentInvoiceAccount(null);
        };
    }, []);

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '청구서 수신 메일', href: OrgInvoiceAccountListPageRoute.path(orgId)},
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
                <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
                    <GoogleLoginBtn
                        about="gmail"
                        onCode={(code) => {
                            if (!currentInvoiceAccount) return;
                            renewAccountWithConfirm(orgId, currentInvoiceAccount, {code});
                        }}
                    >
                        <button id="invoice-email-token-refresh-button">지메일 계정 연동 로그인 트리거</button>
                    </GoogleLoginBtn>
                </GoogleOAuthProvider>
            </div>
        </ShowPage>
    );
});
