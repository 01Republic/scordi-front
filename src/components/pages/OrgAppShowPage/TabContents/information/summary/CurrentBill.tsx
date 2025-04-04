import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {Locale, t_BillingCycleTerm} from '^models/Subscription/types/billingCycleType';
import {Receipt} from 'lucide-react';

interface CurrentBillProps {
    subscription: SubscriptionDto;
}

export const CurrentBill = memo((props: CurrentBillProps & WithChildren) => {
    const {subscription, children} = props;
    const {product, paymentPlan, billingCycle} = subscription;

    const isFreeTier = subscription.isFreeTier;
    const cycleName = billingCycle ? t_BillingCycleTerm(billingCycle.term, true, Locale.en) : '-';
    const totalPrice = `$${subscription.nextBillingAmount.toFixed(2)}`;

    const diffPercent = (() => {
        const nextAmt = subscription.nextBillingAmount;
        const prevAmt = subscription.nextBillingAmount; // TODO: application.prevBillingAmount or application.paymentHistories.last.amount
        const sub = nextAmt - prevAmt;
        // const delta = sub > 0 ? sub : -1 * sub;
        const ratio = sub / prevAmt;
        return ratio * 100;
    })();

    const diffMessage = (() => {
        // increased
        if (diffPercent > 0) return `${diffPercent}% more than last month`;
        // decreased
        if (diffPercent < 0) return `${-1 * diffPercent}% less than last month`;
        // not changed
        return `There is no change with last month`;
    })();

    return (
        <>
            <div className="stat-figure text-primary">
                <Receipt size={36} />
            </div>
            <div className="stat-title mb-2">Current {cycleName} bill</div>
            <div className="stat-value mb-3 text-primary">{isFreeTier ? 'Free' : totalPrice}</div>
            <div className="stat-desc">{diffMessage}</div>
        </>
    );
});
