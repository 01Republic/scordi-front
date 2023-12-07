import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {BsDashCircle} from 'react-icons/bs';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {subscription} = props;
    const {product} = subscription;

    return (
        <li>
            <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral no-selectable rounded-box">
                <Avatar
                    src={product.image}
                    className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
                />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar">
                        {product.name()}
                    </p>
                </div>

                <div className="flex items-center" style={{alignSelf: 'stretch'}}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            // removeMember(member);
                        }}
                        className="relative top-[-2px] text-red-300 hover:text-red-500 transition-all"
                    >
                        <BsDashCircle className="" size={24} strokeWidth={0.3} />
                    </button>
                </div>
            </div>
        </li>
    );
});
SubscriptionItem.displayName = 'SubscriptionItem';
