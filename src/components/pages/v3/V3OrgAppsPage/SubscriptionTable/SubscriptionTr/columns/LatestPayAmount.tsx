import {memo, useEffect, useState} from 'react';
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
    const [payAmount, setPayAmount] = useState(0);

    useEffect(() => {
        const amount = latestBillingHistory?.getPriceIn(displayCurrency);

        if (!amount || isNaN(amount)) return;

        setPayAmount(amount);
    }, [latestBillingHistory]);

    return (
        <p className="text-sm">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(payAmount, '')}</span>
        </p>
    );
});
LatestPayAmount.displayName = 'LatestPayAmount';
