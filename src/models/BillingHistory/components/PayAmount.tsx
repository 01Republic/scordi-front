import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface PayAmountProps {
    billingHistory: BillingHistoryDto;
}

// 결제금액
export const PayAmount = memo((props: PayAmountProps) => {
    const {billingHistory} = props;

    if (!billingHistory.payAmount) return <></>;

    const {payAmount} = billingHistory;
    const {code, amount, symbol, format} = payAmount;
    const {exchangedCurrency, dollarPrice, exchangeRate} = payAmount;

    return (
        <div className={`flex items-center gap-1 justify-end ${billingHistory.paidAt ? '' : 'text-red-400'}`}>
            <span>{symbol}</span>
            <span>{Math.round(amount).toLocaleString()}</span>
        </div>
    );
});
PayAmount.displayName = 'PayAmount';
