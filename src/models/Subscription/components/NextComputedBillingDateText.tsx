import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {lpp, yyyy_mm_dd} from '^utils/dateTime';
import {subHours} from 'date-fns';

interface NextComputedBillingDateTextProps {
    subscription: SubscriptionDto;
}

export const NextComputedBillingDateText = memo((props: NextComputedBillingDateTextProps) => {
    const {subscription} = props;

    if (!subscription.nextComputedBillingDate) {
        return <p className="text-sm text-gray-400">-</p>;
    }
    return <p className="text-sm">{lpp(subHours(subscription.nextComputedBillingDate, 9), 'P')}</p>;
});
NextComputedBillingDateText.displayName = 'NextComputedBillingDateText';
