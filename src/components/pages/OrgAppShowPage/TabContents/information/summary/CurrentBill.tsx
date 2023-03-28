import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ApplicationDto} from '^types/application.type';
import {BiReceipt} from '^components/react-icons';
import {Locale, t_BillingCycleTerm} from '^types/applicationBillingCycle.type';

interface CurrentBillProps {
    application: ApplicationDto;
}

export const CurrentBill = memo((props: CurrentBillProps & WithChildren) => {
    const {application, children} = props;
    const {prototype, paymentPlan, billingCycle} = application;

    const isFreeTier = application.isFreeTier;
    const cycleName = billingCycle ? t_BillingCycleTerm(billingCycle.term, true, Locale.en) : '-';
    const totalPrice = `$${application.nextBillingAmount.toFixed(2)}`;

    const diffPercent = (() => {
        const nextAmt = application.nextBillingAmount;
        const prevAmt = application.nextBillingAmount; // TODO: application.prevBillingAmount or application.paymentHistories.last.amount
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
                <BiReceipt size={36} />
            </div>
            <div className="stat-title mb-2">Current {cycleName} bill</div>
            <div className="stat-value mb-3 text-primary">{isFreeTier ? 'Free' : totalPrice}</div>
            <div className="stat-desc">{diffMessage}</div>
        </>
    );
});
