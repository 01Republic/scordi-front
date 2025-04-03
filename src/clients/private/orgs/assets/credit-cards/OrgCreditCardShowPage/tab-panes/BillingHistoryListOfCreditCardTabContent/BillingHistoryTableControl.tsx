import React, {memo, useEffect, useState} from 'react';
import {FileSpreadsheet} from 'lucide-react';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';
import {BillingHistoryExcelUploadModal} from './BillingHistoryExcelUploadModal';
import {getCreditCardPolicyDuration} from '^models/TopLineBanner/type';
import {pick} from '^types/utils/one-of-list.type';
import {useGetCodefCardDetail} from '^models/CodefCard/hooks/useCodefCardSync';
import {useSetRecoilState} from 'recoil';
import {topLineBannerAtom, useOrgIdParam} from '^atoms/common';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {UploadBillingHistoryExcelModalConfirm} from '^clients/private/_modals/UploadBillingHistoryExcelModalConfirm';

export const BillingHistoryTableControl = memo(() => {
    return (
        <div className="flex items-center justify-between mb-4">
            <BillingHistoryScopeHandler />

            <div>
                <div className="flex items-center gap-2">
                    <ExcelUploadButton />
                </div>
            </div>
        </div>
    );
});

export const ExcelUploadButton = memo(() => {
    const orgId = useOrgIdParam();
    const {result} = useCodefCardsOfCreditCardShow();
    const currentCodefCard = pick(result.items[0]);
    const codefCardDetail = useGetCodefCardDetail(orgId, currentCodefCard?.id);
    const setTopLineBanner = useSetRecoilState(topLineBannerAtom);
    const [isExcelUploadModalOpen, setIsExcelUploadModalOpen] = useState(false);
    const [isExcelModalConfirmOpen, setIsExcelModalConfirmOpen] = useState(false);

    const cardCompany = currentCodefCard?.resCardName || '';
    const duration = getCreditCardPolicyDuration(cardCompany);
    const topLineBannerText = `카드사 정책으로 인해 최근 ${duration} 내역만 불러왔어요. 엑셀로 결제내역을 등록해주세요!`;

    const onClick = () => {
        setIsExcelModalConfirmOpen(true);
    };

    useEffect(() => {
        if (!codefCardDetail || !currentCodefCard) return;

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

    return (
        <>
            <button
                type="button"
                onClick={() => setIsExcelUploadModalOpen(true)}
                className="btn btn-sm btn-white gap-2 "
            >
                <FileSpreadsheet fontSize={14} />
                <span>엑셀로 등록하기</span>
            </button>
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
        </>
    );
});
