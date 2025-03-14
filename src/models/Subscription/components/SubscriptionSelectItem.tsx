import React, {memo, useEffect, useState} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';
import {FaCheck} from 'react-icons/fa6';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';

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
                    <FaCheck
                        fontSize={16}
                        strokeWidth={0.3}
                        className={isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'}
                    />
                    {/*{isSelected ? (*/}
                    {/*    <BsCheckCircleFill size={24} strokeWidth={0.3} className="text-indigo-500" />*/}
                    {/*) : (*/}
                    {/*    <BsCheckCircle*/}
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
