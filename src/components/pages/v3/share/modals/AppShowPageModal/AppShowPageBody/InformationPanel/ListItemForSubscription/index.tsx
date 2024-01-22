import React, {memo} from 'react';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {SubscriptionDto} from '^models/Subscription/types';
import {useModal} from '^v3/share/modals';
import {registerAliasModal} from '^v3/share/modals/AppShowPageModal/RegisterAliasModal/atom';

interface ListItemForSubscriptionProps {
    subscription: SubscriptionDto;
}
export const ListItemForSubscription = memo((props: ListItemForSubscriptionProps) => {
    const {open} = useModal(registerAliasModal);
    const {subscription} = props;

    const value = subscription?.alias;

    const onClick = () => {
        open();
    };
    return (
        <MobileInfoListItem label="별칭" onClick={() => onClick()}>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 hover:font-semibold">
                {value ? (
                    <span className="col-span-2">{value}</span>
                ) : (
                    <span className="text-sm text-gray-500">별칭을 등록해보세요</span>
                )}
            </div>
        </MobileInfoListItem>
    );
});
