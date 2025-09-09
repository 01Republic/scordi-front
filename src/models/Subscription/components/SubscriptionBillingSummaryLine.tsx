import React from 'react';
import {lpp} from '^utils/dateTime';
import {SubscriptionDto, t_SubscriptionBillingCycleType} from '^models/Subscription/types';
import {cn} from '^public/lib/utils';

interface Props {
    // creditCard 나 bankAccount 등 결제수단을 Join 하여 가져와야 함. (연결되지 않은 경우 에러는 안남.)
    subscription: SubscriptionDto;
    className?: string;
}

// creditCard 나 bankAccount 등 결제수단을 Join 하여 가져와야 함. (연결되지 않은 경우 에러는 안남.)
export const SubscriptionBillingSummaryLine = (props: Props) => {
    const {subscription, className = ''} = props;

    const {billingCycleType, bankAccount, creditCard} = subscription;

    const creditCardCompany = creditCard?.company?.displayName;
    const creditCardEndNumber = creditCard?.secretInfo?.number4;

    const bankCompany = bankAccount?.bankName || undefined;
    const bankEndNumber = bankAccount?.endNumber();

    const companyName = creditCardCompany || bankCompany || '';
    const endNumber = creditCardEndNumber || bankEndNumber || '';

    return (
        <section className={cn(`flex gap-1 !text-gray-500 text-14`, className)}>
            {/* 결제 주기 */}
            <span>{t_SubscriptionBillingCycleType(billingCycleType, true)} |</span>

            {/* 마지막 결제일 */}
            <span>{lpp(subscription.lastPaidAt, 'P') || '-'} |</span>

            {/* 결제수단 */}
            <div>
                <span>{companyName || '-'}</span>
                {endNumber && <span>({endNumber})</span>}
            </div>
        </section>
    );
};
