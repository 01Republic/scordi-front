import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {useSetRecoilState} from 'recoil';
import {navTabIndex} from '^components/pages/OrgAppShowPage';
import {CalendarDays} from 'lucide-react';
import {yyyy_mm_dd} from '^utils/dateTime';

interface PaymentDueProps {
    subscription: SubscriptionDto;
}

export const PaymentDue = memo((props: PaymentDueProps & WithChildren) => {
    const {subscription, children} = props;
    const setTabIndex = useSetRecoilState(navTabIndex);

    const {product} = subscription;
    const paymentDue = subscription.nextBillingDate ? yyyy_mm_dd(subscription.nextBillingDate) : '-';

    const colorClass = (() => {
        return 'text-primary';
    })();

    return (
        <>
            <div className={`stat-figure ${colorClass}`}>
                <CalendarDays size={36} />
            </div>
            <div className="stat-title mb-2">Next payment due</div>
            <div className="stat-value mb-3">
                <span className={colorClass}>{paymentDue}</span>
            </div>
            <div className="stat-desc">
                <a className="text-primary hover:link" onClick={() => setTabIndex(2)}>
                    View payment history
                </a>
            </div>
        </>
    );
});
