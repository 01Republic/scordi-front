import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';

interface LatestPayAmountProps {
    latestBillingHistory: BillingHistoryDto;
}

export const LatestPayAmount = memo((props: LatestPayAmountProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {latestBillingHistory} = props;

    const payAmount = latestBillingHistory.getPriceIn(displayCurrency);

    return (
        <p className="text-sm">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(payAmount, '')}</span>
        </p>
    );
});
LatestPayAmount.displayName = 'LatestPayAmount';
