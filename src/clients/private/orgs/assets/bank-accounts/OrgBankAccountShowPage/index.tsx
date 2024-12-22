import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {CreditCardProfilePanel} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CreditCardProfilePanel';
import {CreditCardActionPanel} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CreditCardActionPanel';
import {
    BillingHistoryListOfCreditCardTabContent,
    SubscriptionListOfCreditCardTabContent,
} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/tab-panes';
import {CardInformationPanel} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';

export const OrgBankAccountShowPage = memo(function OrgBankAccountShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

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
                    <CreditCardProfilePanel />
                </div>

                <CreditCardActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={['구독', '결제']}
                    />

                    {/* right side */}
                    <div>
                        <div></div>
                    </div>
                </div>

                {activeTabIndex == 0 && (
                    <div className="grid grid-cols-10">
                        <div className="col-span-7 pr-4">
                            <SubscriptionListOfCreditCardTabContent />
                        </div>

                        <div className="col-span-3 border-l border-gray-300 text-14">
                            <CardInformationPanel />
                        </div>
                    </div>
                )}
                {activeTabIndex == 1 && <BillingHistoryListOfCreditCardTabContent />}
                {/*{activeTabIndex == 2 && <div>동기화</div>}*/}
            </main>
        </ShowPage>
    );
});
