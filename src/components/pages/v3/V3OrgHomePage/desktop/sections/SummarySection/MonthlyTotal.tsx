import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {monthlyPaidAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyPaidAmount';
import {monthlyRemainAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyRemainAmount';
import {currencyFormat} from '^utils/number';

export const MonthlyTotal = memo(function MonthlyTotal() {
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
