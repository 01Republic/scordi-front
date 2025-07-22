import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {getCreditCardPolicyDuration} from '^models/TopLineBanner/type';
import {useOldestCodefBillingHistory} from '^models/CodefBillingHistory/hook';
import {PageFlash} from '^clients/private/_layouts/_shared/PageFlash';
import {yyyy_mm} from '^utils/dateTime';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {useCreditCardPageFlashForExcelUpload} from './atom';

interface CreditCardPageFlashHandlerProps {
    uploadExcelModalConfirmOpen: () => void;
}

export const CreditCardPageFlashHandler = (props: CreditCardPageFlashHandlerProps) => {
    const {uploadExcelModalConfirmOpen} = props;
    const orgId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const {isShowPageFlash, setIsShowPageFlash} = useCreditCardPageFlashForExcelUpload();
    const {currentCodefCard} = useCodefCardsOfCreditCardShow2(creditCardId);
    const {data: oldestCodefBillingHistory} = useOldestCodefBillingHistory(orgId, currentCodefCard?.id);

    useEffect(() => {
        const inSituation = checkCardPolicyLimitedSituation(currentCodefCard, oldestCodefBillingHistory);
        if (inSituation) setIsShowPageFlash(true);
    }, [currentCodefCard, oldestCodefBillingHistory]);

    if (!currentCodefCard) return <></>;
    if (!isShowPageFlash) return <></>;

    const cardCompany = currentCodefCard.resCardName;
    const cardPolicyDuration = getCreditCardPolicyDuration(cardCompany);

    return (
        <PageFlash
            text={`카드사 정책으로 인해 최근 ${cardPolicyDuration} 내역만 불러왔어요. 엑셀로 결제내역을 등록해주세요!`}
            id={`CreditCardPageFlashHandler-${currentCodefCard.id}`}
            theme="waring"
            type="button"
            closeButton={true}
            onClick={uploadExcelModalConfirmOpen}
        />
    );
};

/**
 * 카드사 정책으로 인해 불러오지 못한 결제내역이 있을지 추정하고,
 * 그런 상황이 아니라면 이 플래시를 노출할 이유가 없으므로 종료.
 * TODO. codef 카드 최초 발급일자(년,월) / codef 결제내역 중 가장 오래된 결제일(년,월) 비교하는 것은 정확한 정보가 아니기 때문에 개선 필요
 */
function checkCardPolicyLimitedSituation(codefCard?: CodefCardDto, codefBillingHistory?: CodefBillingHistoryDto) {
    if (!codefCard?.resIssueDate) return false;
    if (!codefBillingHistory?.usedAt) return false;

    const issuedAt = dayjs(codefCard.resIssueDate, 'YYYYMM').toDate();
    const usedAt = codefBillingHistory.usedAt; // 결제일시

    return yyyy_mm(issuedAt) !== yyyy_mm(usedAt);
}
