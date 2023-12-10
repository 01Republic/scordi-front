import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {useModal} from '^v3/share/modals/useModal';
import {appShowPageModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {useSetRecoilState} from 'recoil';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';

interface SubscriptionCardProps {
    subscription: SubscriptionDto;
}

export const SubscriptionCard = memo((props: SubscriptionCardProps) => {
    const {subscription} = props;
    const {product, teamMembers} = subscription;
    const {open} = useModal(appShowPageModal);
    const setAppId = useSetRecoilState(appIdState);

    const onClick = () => {
        setAppId(subscription.id);
        open();
    };

    return (
        <div
            onClick={onClick}
            className="card p-4 bg-base-100 shadow-md hover:shadow-lg flex flex-row gap-2 items-start cursor-pointer relative"
        >
            <div>
                <Avatar className="w-8" src={product.image}>
                    <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                </Avatar>
            </div>
            <div className="flex-1 h-full flex flex-col items-end gap-2">
                <p className="text-15 font-semibold text-right leading-none min-h-[30px]">{product.name()}</p>
                <p className="mt-auto text-sm text-gray-500">{(teamMembers || []).length.toLocaleString()}명</p>
            </div>
        </div>
    );
});
SubscriptionCard.displayName = 'SubscriptionCard';
