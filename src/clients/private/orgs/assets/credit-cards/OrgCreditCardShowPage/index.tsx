import {useOrgIdParam} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {UploadBillingHistoryExcelModalConfirm} from '^clients/private/_modals/UploadBillingHistoryExcelModalConfirm';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {CardInformationPanel} from './CardInformationPanel';
import {CreditCardActionPanel} from './CreditCardActionPanel';
import {BillingHistoryExcelUploadModal} from './CreditCardModals/BillingHistoryExcelUploadModal';
import {CreditCardPageFlashHandler} from './CreditCardPageFlashHandler';
import {useCreditCardPageFlashForExcelUpload} from './CreditCardPageFlashHandler/atom';
import {CreditCardProfilePanel} from './CreditCardProfilePanel';
import {useCurrentCreditCard} from './atom';
import {BillingHistoryListOfCreditCardTabContent, SubscriptionListOfCreditCardTabContent} from './tab-panes';

export const OrgCreditCardShowPage = memo(function OrgCreditCardShowPage() {
    const {t} = useTranslation('assets');
    const orgId = useOrgIdParam();
    const {currentCreditCard} = useCurrentCreditCard();
    const {setIsShowPageFlash} = useCreditCardPageFlashForExcelUpload();
    const [isExcelUploadModalOpen, setIsExcelUploadModalOpen] = useState(false);
    const [isExcelModalConfirmOpen, setIsExcelModalConfirmOpen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage
            breadcrumb={[
                t('common.asset') as string,
                {
                    text: t('creditCard.title') as string,
                    active: false,
                    href: OrgCreditCardListPageRoute.path(orgId),
                },
                {text: t('creditCard.show.title') as string, active: true},
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
                        tabs={[
                            t('creditCard.show.tabs.subscriptions') as string,
                            t('creditCard.show.tabs.billingHistory') as string,
                        ]}
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
                            {currentCreditCard && (
                                <CardInformationPanel orgId={orgId} creditCardId={currentCreditCard.id} />
                            )}
                        </div>
                    </div>
                )}
                {activeTabIndex == 1 && (
                    <BillingHistoryListOfCreditCardTabContent
                        excelUploadModalClose={() => setIsExcelUploadModalOpen(true)}
                    />
                )}
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
