import React from 'react';
import dayjs from 'dayjs';
import {useOrgIdParam} from '^atoms/common';
import {pick} from '^types/utils/one-of-list.type';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {getCreditCardPolicyDuration} from '^models/TopLineBanner/type';
import {useOldestCodefBillingHistory} from '^models/CodefBillingHistory/hook';
import {PageFlash} from '^clients/private/_layouts/_shared/PageFlash';
import {yyyy_mm} from '^utils/dateTime';

interface CreditCardPageFlashHandlerProps {
    uploadExcelModalConfirmOpen: () => void;
}

export const CreditCardPageFlashHandler = (props: CreditCardPageFlashHandlerProps) => {
    const {uploadExcelModalConfirmOpen} = props;
    const orgId = useOrgIdParam();
    const {result} = useCodefCardsOfCreditCardShow();
    const currentCodefCard = pick(result.items[0]);
    const codefId = currentCodefCard?.id;

    const {data: oldestCodefBillingHistory, isError} = useOldestCodefBillingHistory(orgId, codefId);


    if (!currentCodefCard || !oldestCodefBillingHistory || isError) return <></>;

    const codefCardResIssueDate = yyyy_mm(dayjs(currentCodefCard.resIssueDate, 'YYYYMM').toDate());
    const oldestCodefBillingHistoryDate = yyyy_mm(oldestCodefBillingHistory.usedAt);

    if (codefCardResIssueDate === oldestCodefBillingHistoryDate) return <></>;

    const cardCompany = currentCodefCard?.resCardName || '';
    const duration = getCreditCardPolicyDuration(cardCompany);
    const topLineBannerText = `카드사 정책으로 인해 최근 ${duration} 내역만 불러왔어요. 엑셀로 결제내역을 등록해주세요!`;

    return (
        <PageFlash
            text={topLineBannerText}
            id={currentCodefCard?.id || 0}
            theme="waring"
            type="button"
            closeButton={true}
            onClick={uploadExcelModalConfirmOpen}
        />
    );
};
