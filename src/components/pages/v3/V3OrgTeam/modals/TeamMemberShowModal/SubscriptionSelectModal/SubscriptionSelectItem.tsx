import React, {memo, useEffect, useState} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {BsCheckCircle, BsCheckCircleFill} from 'react-icons/bs';

interface SubscriptionSelectItemProps {
    subscription: SubscriptionDto;
    onClick: (selected: SubscriptionDto) => any;
    isModalShown: boolean;
}

export const SubscriptionSelectItem = memo((props: SubscriptionSelectItemProps) => {
    const [isSelected, setSelected] = useState(false);
    const {subscription, onClick: _onClick, isModalShown} = props;
    const {product} = subscription;

    useEffect(() => {
        if (!isModalShown) {
            setSelected(false);
        }
    }, [isModalShown]);

    const onClick = () => {
        setSelected((v) => !v);
        _onClick(subscription);
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-neutral rounded-box cursor-pointer group"
        >
            <Avatar src={product.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full" />

            <div className="flex-1">
                <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar">
                    {product.name()}
                </p>
            </div>

            <div className="flex items-center">
                <button className="relative">
                    {isSelected ? (
                        <BsCheckCircleFill size={24} strokeWidth={0.3} className="text-indigo-500" />
                    ) : (
                        <BsCheckCircle
                            size={24}
                            strokeWidth={0.3}
                            className="text-indigo-200 group-hover:text-indigo-300"
                        />
                    )}
                </button>
            </div>
        </div>
    );
});
SubscriptionSelectItem.displayName = 'SubscriptionSelectItem';
