import React, {memo, useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {topLineBannerAtom, useOrgIdParam} from '^atoms/common';
import {pick} from '^types/utils/one-of-list.type';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {useGetCodefCardHistory} from '^models/CodefCard/hooks/useCodefCardSync';
import {getCreditCardPolicyDuration} from '^models/TopLineBanner/type';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {UploadBillingHistoryExcelModalConfirm} from '^clients/private/_modals/UploadBillingHistoryExcelModalConfirm';
import {BillingHistoryExcelUploadModal} from '../OrgCreditCardShowPage/CreditCardModals/BillingHistoryExcelUploadModal';
import {SubscriptionListOfCreditCardTabContent, BillingHistoryListOfCreditCardTabContent} from './tab-panes';
import {CreditCardProfilePanel} from './CreditCardProfilePanel';
import {CreditCardActionPanel} from './CreditCardActionPanel';
import {CardInformationPanel} from './CardInformationPanel';

export const OrgCreditCardShowPage = memo(function OrgCreditCardShowPage() {
    const orgId = useOrgIdParam();
    const {result} = useCodefCardsOfCreditCardShow();
    const currentCodefCard = pick(result.items[0]);
    const codefCardHistory = useGetCodefCardHistory(orgId, 55);
    const setTopLineBanner = useSetRecoilState(topLineBannerAtom);
    const [isExcelUploadModalOpen, setIsExcelUploadModalOpen] = useState(false);
    const [isExcelModalConfirmOpen, setIsExcelModalConfirmOpen] = useState(false);

    const cardCompany = currentCodefCard?.resCardName || '';
    const duration = getCreditCardPolicyDuration(cardCompany);
    const topLineBannerText = `카드사 정책으로 인해 최근 ${duration} 내역만 불러왔어요. 엑셀로 결제내역을 등록해주세요!`;

    const onClick = () => {
        setIsExcelModalConfirmOpen(true);
    };

    console.log('codefCardDetail', codefCardHistory.data);
    console.log('currentCodefCard', currentCodefCard?.id);

    useEffect(() => {
        if (!codefCardHistory || !currentCodefCard) return;

        if (currentCodefCard) {
            setTopLineBanner({
                text: topLineBannerText,
                id: currentCodefCard.id,
                theme: 'waring',
                type: 'button',
                closeButton: true,
                onClick: onClick,
            });
        }
    }, [currentCodefCard]);

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage
            breadcrumb={[
                '자산',
                {text: '결제수단 (카드)', active: false, href: OrgCreditCardListPageRoute.path(orgId)},
                {text: '카드 상세', active: true},
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
                <BillingHistoryExcelUploadModal
                    isOpened={isExcelUploadModalOpen}
                    onClose={() => setIsExcelUploadModalOpen(false)}
                />
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
