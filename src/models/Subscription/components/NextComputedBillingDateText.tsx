import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {yyyy_mm_dd} from '^utils/dateTime';

interface NextComputedBillingDateTextProps {
    subscription: SubscriptionDto;
}

export const NextComputedBillingDateText = memo((props: NextComputedBillingDateTextProps) => {
    const {subscription} = props;

    if (!subscription.nextComputedBillingDate) {
        return <p className="text-sm text-gray-400">-</p>;
    }
    return <p className="text-sm">{yyyy_mm_dd(subscription.nextComputedBillingDate)}</p>;
});
NextComputedBillingDateText.displayName = 'NextComputedBillingDateText';
