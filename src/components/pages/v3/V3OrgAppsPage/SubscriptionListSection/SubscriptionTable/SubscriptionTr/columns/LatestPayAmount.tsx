import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';
import {SubscriptionDto} from '^models/Subscription/types';

interface LatestPayAmountProps {
    subscription: SubscriptionDto;
}

export const LatestPayAmount = memo((props: LatestPayAmountProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const symbol = getCurrencySymbol(displayCurrency);
    const {subscription} = props;

    const billingAmount = subscription.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0;

    return (
        <p className="text-sm">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(billingAmount, '')}</span>
        </p>
    );
});
LatestPayAmount.displayName = 'LatestPayAmount';
