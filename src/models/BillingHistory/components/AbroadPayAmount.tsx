import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';

interface AbroadPayAmountProps {
    billingHistory: BillingHistoryDto;
}

export const AbroadPayAmount = memo((props: AbroadPayAmountProps) => {
    const {billingHistory} = props;
    const {about, abroadPayAmount, payAmount} = billingHistory;
    // if (!abroadPayAmount) return <>-</>;

    // 백엔드에서 작업이 필요하여 프론트에서 임시 방어
    // 기존에 abroadPayAmount는 외화금액만 담고 있었으나, 내부정책이 바뀌어,
    // abroadPayAmount는 청구된 금액, payAmount는 원화금액으로 사용할 예정
    // 때문에 바뀌기 이전 정책으로 섞여있는 경우가 있을 수 있어 abroadPayAmount가 없는 경우 payAmount를 보여줌
    // 백엔드 작업 안되는 경우 요청 하고, 완료되면 abroadPayAmount만 보여주도록 수정 되어야함
    const displayAmount = abroadPayAmount ? abroadPayAmount : payAmount;

    if (!displayAmount) return <>-</>;

    return (
        <div
            className={`flex items-center gap-1 justify-end ${
                about === BillingHistoryStatus.PayFail ? 'text-red-400' : ''
            }`}
        >
            <span>{displayAmount.symbol}</span>
            <span>{displayAmount.formatRoundedAmount}</span>
        </div>
    );
});
