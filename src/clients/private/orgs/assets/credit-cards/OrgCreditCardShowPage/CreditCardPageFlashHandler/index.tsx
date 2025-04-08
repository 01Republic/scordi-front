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

    const isShowPageFlash =
        !!currentCodefCard &&
        !isError &&
        !!oldestCodefBillingHistory &&
        !!oldestCodefBillingHistory.usedAt &&
        !!currentCodefCard.resIssueDate &&

    if (!isShowPageFlash) return <></>;

    const codefCardResIssueYearMonth = dayjs(currentCodefCard.resIssueDate, 'YYYYMM').format('YYYY년 MM월');
    const oldestCodefBillingHistoryYearMonth = yyyy_mm(oldestCodefBillingHistory.usedAt, '년', '월');

    // TODO. codef 카드 최초 발급일자(년,월) / codef 결제내역 중 가장 오래된 결제일(년,월) 비교하는 것은 정확한 정보가 아니기 때문에 개선 필요
    if (codefCardResIssueYearMonth === oldestCodefBillingHistoryYearMonth) return <></>;

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
