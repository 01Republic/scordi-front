import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';

interface PayAmountProps {
    billingHistory: BillingHistoryDto;
}

// 결제금액
export const PayAmount = memo((props: PayAmountProps) => {
    const {billingHistory} = props;
    const {about, payAmount, abroadPayAmount} = billingHistory;

    const displayPayAmount = abroadPayAmount || payAmount;
    if (!displayPayAmount) return <>-</>;

    // const {code, amount, symbol, format} = payAmount;
    // const {exchangedCurrency, dollarPrice, exchangeRate} = payAmount;

    return (
        <div
            className={`flex items-center gap-1 justify-end ${
                about === BillingHistoryStatus.PayFail ? 'text-red-400' : ''
            }`}
        >
            <span>{displayPayAmount.symbol}</span>
            <span>{displayPayAmount.roundedAmount}</span>
        </div>
    );
});
PayAmount.displayName = 'PayAmount';
