import React, {memo} from 'react';
import {SubscriptionProfile} from '^models/Subscription/components';
import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat, roundNumber} from '^utils/number';

interface PaidSubscriptionSpendItemProps {
    amount: number;
    subscription: SubscriptionDto;
}

export const PaidSubscriptionSpendItem = memo((props: PaidSubscriptionSpendItemProps) => {
    const {amount, subscription} = props;

    return (
        <li className="w-full py-5 flex items-center justify-between">
            <SubscriptionProfile
                subscription={subscription}
                width={20}
                height={20}
                className="gap-3"
                textClassName="text-14 font-base font-normal"
                isAlias={false}
            />
            <p className="whitespace-nowrap"> {amount > 0 ? currencyFormat(roundNumber(amount) * -1) : '-'}</p>
        </li>
    );
});
