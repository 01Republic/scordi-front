import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {FaRegCreditCard} from 'react-icons/fa6';
import {SubscriptionUsingStatusTag} from '^models/Subscription/components';
import {SubscriptionDto} from '^models/Subscription/types';

interface SubscriptionProfilePanelProps {
    subscription: SubscriptionDto;
}

export const SubscriptionProfilePanel = memo((props: SubscriptionProfilePanelProps) => {
    const {subscription} = props;

    return (
        <div className="flex items-start gap-6">
            <Avatar className="w-14 h-14" src={subscription.product.image} alt={subscription.product.name()}>
                <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
            </Avatar>

            <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                <p className="flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1">
                    <span className="truncate">{subscription.product.name()}</span>
                </p>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                    {subscription.alias || '별칭이 없습니다'}
                </p>

                <div className="flex items-center gap-3 pt-3">
                    <SubscriptionUsingStatusTag
                        value={subscription.usingStatus}
                        className="no-selectable !cursor-default"
                    />
                </div>
            </div>
        </div>
    );
});
