import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionDto} from '^types/subscription.type';
import {BiCalendarStar} from '^components/react-icons';
import {useSetRecoilState} from 'recoil';
import {navTabIndex} from '^components/pages/OrgAppShowPage';

interface PaymentDueProps {
    application: SubscriptionDto;
}

export const PaymentDue = memo((props: PaymentDueProps & WithChildren) => {
    const {application, children} = props;
    const setTabIndex = useSetRecoilState(navTabIndex);

    const {prototype} = application;

    const paymentDue = application.nextBillingDate || '-';

    const colorClass = (() => {
        return 'text-primary';
    })();

    return (
        <>
            <div className={`stat-figure ${colorClass}`}>
                <BiCalendarStar size={36} />
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
