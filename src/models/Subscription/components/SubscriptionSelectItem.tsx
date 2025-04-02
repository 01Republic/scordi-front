import React, {memo, useEffect, useState} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {Check, CheckCircle} from 'lucide-react';

interface SubscriptionSelectItemProps {
    subscription: SubscriptionDto;
    onClick?: (selected: SubscriptionDto) => any;
    isSelected?: boolean;
}

export const SubscriptionSelectItem = memo((props: SubscriptionSelectItemProps) => {
    const {subscription, onClick, isSelected = false} = props;
    const {product} = subscription;

    return (
        <div
            onClick={() => onClick && onClick(subscription)}
            className="flex items-center justify-between px-4 py-3 -mx-4 no-selectable hover:bg-scordi-light-50 rounded-btn cursor-pointer group"
        >
            <SubscriptionProfile
                subscription={subscription}
                width={28}
                height={28}
                className="gap-4"
                profileClassName="outline outline-offset-1 outline-slate-100"
                textClassName="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar"
            />

            <div className="flex items-center">
                <button className="relative">
                    <Check
                        strokeWidth={3}
                        className={`text-20 ${
                            isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'
                        }`}
                    />
                    {/*{isSelected ? (*/}
                    {/*    <CheckCircle size={24} strokeWidth={0.3} className="text-indigo-500" />*/}
                    {/*) : (*/}
                    {/*    <CheckCircle*/}
                    {/*        size={24}*/}
                    {/*        strokeWidth={0.3}*/}
                    {/*        className="text-indigo-200 group-hover:text-indigo-300"*/}
                    {/*    />*/}
                    {/*)}*/}
                </button>
            </div>
        </div>
    );
});
SubscriptionSelectItem.displayName = 'SubscriptionSelectItem';
