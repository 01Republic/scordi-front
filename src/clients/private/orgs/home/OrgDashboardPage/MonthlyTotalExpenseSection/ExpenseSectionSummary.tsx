import {memo} from 'react';
import {currencyFormat} from '^utils/number';
import {SubscriptionManager} from '^models/Subscription/manager';
import {SubscriptionDto} from '^models/Subscription/types';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';

interface ExpenseSectionSummaryProps {
    subscriptions: SubscriptionDto[];
}

export const ExpenseSectionSummary = memo((props: ExpenseSectionSummaryProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {subscriptions} = props;

    const summaryTargetSubscriptions = [
        ...SubscriptionManager.init(subscriptions).pending().list,
        ...SubscriptionManager.init(subscriptions).success().list,
    ];

    const totalPrice = summaryTargetSubscriptions.reduce(
        (total, subscription) => total + (subscription.currentBillingAmount?.toDisplayPrice(displayCurrency) || 0),
        0,
    );

    return (
        <p className="font-bold text-28">{`${currencyFormat(
            totalPrice,
        )} · ${summaryTargetSubscriptions.length.toLocaleString()}건`}</p>
    );
});
ExpenseSectionSummary.displayName = 'ExpenseSectionSummary';
