import React, {memo, useMemo, useState} from 'react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {UploadBillingHistoryExcelModalConfirm} from '^clients/private/_modals/UploadBillingHistoryExcelModalConfirm';
import {BillingHistoryExcelUploadModal} from './CreditCardModals/BillingHistoryExcelUploadModal';
import {SubscriptionListOfCreditCardTabContent, BillingHistoryListOfCreditCardTabContent} from './tab-panes';
import {CreditCardProfilePanel} from './CreditCardProfilePanel';
import {CreditCardActionPanel} from './CreditCardActionPanel';
import {CardInformationPanel} from './CardInformationPanel';
import {CreditCardPageFlashHandler} from './CreditCardPageFlashHandler';
import {useCreditCardPageFlashForExcelUpload} from './CreditCardPageFlashHandler/atom';
import { TabConfig, useQueryTab } from '^hooks/useQueryTab';

const SubscriptionTabContent = (creditCardId: number, orgId: number) => (
    <div className="grid grid-cols-10">
    <div className="col-span-7 pr-4">
        <SubscriptionListOfCreditCardTabContent />
    </div>

    <div className="col-span-3 border-l border-gray-300 text-14">
        {creditCardId && (
            <CardInformationPanel orgId={orgId} creditCardId={creditCardId} />
        )}
    </div>
</div>
);

const PaymentTabContent = (setIsExcelUploadModalOpen: (isOpen: boolean) => void) => (
    <BillingHistoryListOfCreditCardTabContent
        excelUploadModalClose={() => setIsExcelUploadModalOpen(true)}
    />
);

const createSubscriptionComponent = (creditCardId: number, orgId: number) => 
    () => SubscriptionTabContent(creditCardId, orgId);

const createPaymentComponent = (setIsExcelUploadModalOpen: (isOpen: boolean) => void) => 
    () => PaymentTabContent(setIsExcelUploadModalOpen);

export const OrgCreditCardShowPage = memo(function OrgCreditCardShowPage() {
    const orgId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const {setIsShowPageFlash} = useCreditCardPageFlashForExcelUpload();
    const [isExcelUploadModalOpen, setIsExcelUploadModalOpen] = useState(false);
    const [isExcelModalConfirmOpen, setIsExcelModalConfirmOpen] = useState(false);

    const tabConfig: TabConfig[] = useMemo(() => [
        { id: 'subscription', label: '구독', component: createSubscriptionComponent(creditCardId, orgId) },
        { id: 'payment', label: '결제', component: createPaymentComponent(setIsExcelUploadModalOpen) },
    ], [creditCardId]);
    const {activeTabIndex, setActiveTabIndex, activeTab} = useQueryTab({tabs: tabConfig, paramKey: 'tab', defaultTab: 'subscription'});

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '결제수단 (카드)', active: false, href: OrgCreditCardListPageRoute.path(orgId)},
                {text: '카드 상세', active: true},
            ]}
        >
            {/* 페이지플래시 핸들러 */}
            <CreditCardPageFlashHandler uploadExcelModalConfirmOpen={() => setIsExcelModalConfirmOpen(true)} />

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
                        tabs={tabConfig.map((tab) => tab.label)}
                    />

                    {/* right side */}
                    <div>
                        <div></div>
                    </div>
                </div>

                {activeTab.component && <activeTab.component />}
                {/*{activeTabIndex == 2 && <div>동기화</div>}*/}

                {/* 결제내역 엑셀 업로드 모달 */}
                <BillingHistoryExcelUploadModal
                    isOpened={isExcelUploadModalOpen}
                    onClose={() => setIsExcelUploadModalOpen(false)}
                    onCreate={() => {
                        setIsShowPageFlash(false);
                        setIsExcelUploadModalOpen(false);
                    }}
                />

                {/* 결제내역 엑셀 업로드 모달 컨펌 */}
                <UploadBillingHistoryExcelModalConfirm
                    isOpened={isExcelModalConfirmOpen}
                    onClose={() => setIsExcelModalConfirmOpen(false)}
                    onClick={() => {
                        setIsExcelUploadModalOpen(true);
                        setIsExcelModalConfirmOpen(false);
                    }}
                />
            </main>
        </ShowPage>
    );
});
