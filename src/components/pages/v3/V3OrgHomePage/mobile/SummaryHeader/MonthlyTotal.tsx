import React, {memo} from 'react';
import {currencyFormat} from '^utils/number';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {monthlyPaidAmountAtom} from './MonthlyPaidAmount';
import {monthlyRemainAmountAtom} from './MonthlyRemainAmount';

export const MonthlyTotal = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const paidAmount = useRecoilValue(monthlyPaidAmountAtom);
    const remainAmount = useRecoilValue(monthlyRemainAmountAtom);
    const totalAmount = Math.round(paidAmount + remainAmount);

    return (
        <p className="text-3xl font-bold no-selectable">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(totalAmount, '')}</span>
        </p>
    );
});
