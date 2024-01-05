import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {CreditCardDto} from '^models/CreditCard/type';

interface CardReceiptBillingHistoryProps {
    billingHistory: BillingHistoryDto;
}

const IsNull = (value: any) => value === null;
export const CardReceiptBillingHistoryInfoPanel = memo(function CardReceiptBillingHistory(
    props: CardReceiptBillingHistoryProps,
) {
    const {billingHistory} = props;
    const {uid, creditCard, paidAt, isDomestic, isVATDeductible, vat} = billingHistory;
    const isDomesticStr = IsNull(isDomestic) ? '미정' : isDomestic ? '국내' : '해외';
    const isVATDeductibleStr = IsNull(isVATDeductible) ? '미정' : isVATDeductible ? '공제' : '불공제';

    return (
        <MobileInfoList>
            <MobileInfoListItem label="승인 번호" className="!items-start">
                <div className="font-light mb-4 keep-all">{uid ? uid : '미입력'}</div>
            </MobileInfoListItem>
            {creditCard ? (
                <CardInfoList creditCard={creditCard} />
            ) : (
                <MobileInfoListItem label="카드" className="!items-start">
                    <div className="font-light mb-4 keep-all">미등록</div>
                </MobileInfoListItem>
            )}
            {paidAt && (
                <MobileInfoListItem label="결제일시" className="!items-start" value={yyyy_mm_dd_hh_mm(paidAt)} />
            )}
            <MobileInfoListItem label="국내/해외 결제" className="!items-start">
                <div className="font-light mb-4 keep-all">{isDomesticStr}</div>
            </MobileInfoListItem>
            <MobileInfoListItem label="공제/불공제" className="!items-start">
                <div className="font-light mb-4 keep-all">{isVATDeductibleStr}</div>
            </MobileInfoListItem>
            <MobileInfoListItem label="부가세" className="!items-start">
                <div className="font-light mb-4 keep-all">{vat?.text ?? '0원'}</div>
            </MobileInfoListItem>
        </MobileInfoList>
    );
});

const CardInfoList = memo(function BillingHistoryCardInfoList(props: {creditCard: CreditCardDto}) {
    const {creditCard} = props;
    const {name, isFromInvoice, holdingMember} = creditCard;

    const cardText = `${isFromInvoice ? '❗' : ''} ${name}`;
    const holdingMemberText = holdingMember ? holdingMember.name : '미정';

    return (
        <>
            <MobileInfoListItem label="카드" className="!items-start">
                <div className="font-light mb-4 keep-all">{cardText}</div>
            </MobileInfoListItem>

            <MobileInfoListItem label="소유자" className="!items-start">
                <div className="font-light mb-4 keep-all">{holdingMemberText}</div>
            </MobileInfoListItem>
        </>
    );
});
