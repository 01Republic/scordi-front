import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {TbLayoutGrid} from 'react-icons/tb';

interface SubscriptionListLayoutProps {
    src: string;
    name: string;
    percent: string;
    amount: string;
}

export const SubscriptionListLayout = memo((props: SubscriptionListLayoutProps) => {
    const {src, name, percent, amount} = props;

    return (
        <li className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 font-medium text-16 text-neutral-900">
                {src ? (
                    <Avatar src={src} className="w-5 h-5" draggable={false} loading="lazy" />
                ) : (
                    <div className="w-5 h-5 rounded-full text-scordi flex items-center justify-center border border-scordi-light">
                        <TbLayoutGrid />
                    </div>
                )}
                <p>{name}</p>
                <p className="font-normal text-14 text-neutral-400">{percent}</p>
            </div>
            <p>{amount ? `-${amount}` : 0}</p>
        </li>
    );
});
