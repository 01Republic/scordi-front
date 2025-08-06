import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus} from '^models/BillingHistory/type';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {currencyFormat} from '^utils/number';

interface MonthlyPaidAmountProps {
    monthlyPaidAmount: number;
}

// 월 누적 결제금액
export const MonthlyPaidAmount = memo((props: MonthlyPaidAmountProps) => {
    const {monthlyPaidAmount} = props;
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);

    return (
        <div className="flex items-center gap-1 justify-end">
            <span>{symbol}</span>
            <span>{currencyFormat(monthlyPaidAmount, '')}</span>
        </div>
    );
});
