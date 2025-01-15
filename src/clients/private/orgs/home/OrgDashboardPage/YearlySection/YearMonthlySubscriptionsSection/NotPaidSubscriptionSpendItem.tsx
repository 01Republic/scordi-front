import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {TbLayoutGrid} from 'react-icons/tb';
import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat} from '^utils/number';

interface NotPaidSubscriptionSpendItemProps {
    amount: number;
    ratio: number;
    subscription: SubscriptionDto;
}

export const NotPaidSubscriptionSpendItem = memo((props: NotPaidSubscriptionSpendItemProps) => {
    const {amount, ratio, subscription} = props;
    const {product} = subscription;

    return (
        <li className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium text-16 text-neutral-900">
                {product.image ? (
                    <Avatar src={product.image} className="w-5 h-5" draggable={false} loading="lazy" />
                ) : (
                    <div className="w-5 h-5 rounded-full text-scordi flex items-center justify-center border border-scordi-light">
                        <TbLayoutGrid />
                    </div>
                )}
                <p>{product.name()}</p>
                <p className="font-normal text-14 text-neutral-400">{ratio.toFixed(1)}%</p>
            </div>
            <p>(예정) - {currencyFormat(amount)}</p>
        </li>
    );
});
