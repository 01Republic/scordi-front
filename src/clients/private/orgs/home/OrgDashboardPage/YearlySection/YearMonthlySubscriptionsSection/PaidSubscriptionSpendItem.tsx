import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {TbLayoutGrid} from 'react-icons/tb';
import {SubscriptionDto} from '^models/Subscription/types';
import {currencyFormat, roundNumber} from '^utils/number';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';

interface PaidSubscriptionSpendItemProps {
    amount: number;
    subscription: SubscriptionDto;
}

export const PaidSubscriptionSpendItem = memo((props: PaidSubscriptionSpendItemProps) => {
    const {amount, subscription} = props;
    const {product} = subscription;

    return (
        <li className="w-full">
            <LinkTo
                href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                className="w-full py-5 flex items-center justify-between"
            >
                <div className="flex items-center gap-3 font-medium text-16 text-neutral-900 whitespace-nowrap">
                    {product.image ? (
                        <Avatar src={product.image} className="w-5 h-5" draggable={false} loading="lazy" />
                    ) : (
                        <div className="w-5 h-5 rounded-full text-scordi flex items-center justify-center border border-scordi-light">
                            <TbLayoutGrid />
                        </div>
                    )}
                    <p>{product.name()}</p>
                </div>
                <p className="whitespace-nowrap"> {amount > 0 ? currencyFormat(roundNumber(amount) * -1) : '-'}</p>
            </LinkTo>
        </li>
    );
});
