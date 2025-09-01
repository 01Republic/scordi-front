import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {lpp} from '^utils/dateTime';
import {subHours} from 'date-fns';

interface Props {
    subscription: SubscriptionDto;
}

export const LastPaidAt = memo((props: Props) => {
    const {subscription} = props;

    if (!subscription.lastPaidAt) {
        return <p className="text-sm text-gray-400">-</p>;
    }
    return <p className="text-sm">{lpp(subscription.lastPaidAt, 'P')}</p>;
});
