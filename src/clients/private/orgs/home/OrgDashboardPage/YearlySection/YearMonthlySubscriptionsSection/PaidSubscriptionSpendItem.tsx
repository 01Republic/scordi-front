import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {TbLayoutGrid} from 'react-icons/tb';
import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat, roundNumber} from '^utils/number';
import {SubscriptionProfile} from '^components/SubscriptionProfile';

interface PaidSubscriptionSpendItemProps {
    amount: number;
    subscription: SubscriptionDto;
}

export const PaidSubscriptionSpendItem = memo((props: PaidSubscriptionSpendItemProps) => {
    const {amount, subscription} = props;

    return (
        <li className="w-full py-5 flex items-center justify-between">
            <SubscriptionProfile subscription={subscription} />
            <p className="whitespace-nowrap"> {amount > 0 ? currencyFormat(roundNumber(amount) * -1) : '-'}</p>
        </li>
    );
});
