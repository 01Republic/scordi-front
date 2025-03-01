import React, {memo, useState} from 'react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {SubscriptionDto} from '^models/Subscription/types';
import {MergeSubscriptionModal} from './MergeSubscriptionModal';
import {RemoveSubscription} from './RemoveSubscription';
import {eventCut} from '^utils/event';

interface SubscriptionItemMoreDropdownProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SubscriptionItemMoreDropdown = memo((props: SubscriptionItemMoreDropdownProps) => {
    const {subscription, reload} = props;
    const [isMergeModalOpened, setIsMergeModalOpened] = useState(false);
    const onMergeModalClose = () => setIsMergeModalOpened(false);

    return (
        <>
            <MoreDropdown
                placement="bottom-end"
                Trigger={() => (
                    <button className={`btn btn-sm !border-gray-400 !bg-white !text-gray-600`}>더보기</button>
                )}
            >
                {() => (
                    <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-13 min-w-[100px]">
                        <div className="cursor-pointer px-2 py-1 hover:bg-slate-100">보기</div>
                        <div className="cursor-pointer px-2 py-1 hover:bg-yellow-100">수정</div>
                        <div
                            className="cursor-pointer px-2 py-1 hover:bg-orange-100"
                            onClick={() => setIsMergeModalOpened(true)}
                        >
                            다른 구독과 합치기
                        </div>
                        <RemoveSubscription subscription={subscription} reload={reload} />
                    </div>
                )}
            </MoreDropdown>
            <MergeSubscriptionModal
                subscription={subscription}
                isOpened={isMergeModalOpened}
                onClose={onMergeModalClose}
                reload={reload}
            />
        </>
    );
});
SubscriptionItemMoreDropdown.displayName = 'SubscriptionItemMoreDropdown';
