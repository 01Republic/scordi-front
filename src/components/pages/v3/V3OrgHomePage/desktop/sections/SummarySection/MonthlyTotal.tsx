import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {currencyFormat} from '^utils/number';
import {monthlyPaidAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyPaidAmount';
import {monthlyRemainAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyRemainAmount';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';

export const MonthlyTotal = memo(function MonthlyTotal() {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {t} = useTranslation('common');
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
