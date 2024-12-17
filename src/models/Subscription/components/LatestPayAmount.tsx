import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {currencyFormat} from '^utils/number';
import {SubscriptionDto} from '^models/Subscription/types';
import {MoneySimpleRounded} from '^models/Money/components/money.simple-rounded';

interface LatestPayAmountProps {
    subscription: SubscriptionDto;
    currencyChangeable?: boolean;
}

export const LatestPayAmount = memo((props: LatestPayAmountProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {subscription, currencyChangeable = false} = props;
    const {currentBillingAmount} = subscription;

    if (!currentBillingAmount) return <p className="text-sm">-</p>;
    if (!currencyChangeable) return <MoneySimpleRounded money={currentBillingAmount} />;

    const symbol = getCurrencySymbol(displayCurrency);
    const billingAmount = currentBillingAmount.toDisplayPrice(displayCurrency);

    return (
        <p className="text-sm">
            <small className="mr-1">{symbol}</small>
            <span>{currencyFormat(billingAmount, '')}</span>
        </p>
    );
});
LatestPayAmount.displayName = 'LatestPayAmount';
