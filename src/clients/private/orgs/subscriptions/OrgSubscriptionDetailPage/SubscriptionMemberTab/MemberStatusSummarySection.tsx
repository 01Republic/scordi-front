import React, {memo} from 'react';
import {RiUser3Fill, RiUserFollowFill, RiUserForbidFill, RiUserUnfollowFill} from 'react-icons/ri';
import {useCurrentSubscription} from '../atom';
import {StatusCard} from '../SubscriptionInfoTab/StatusCard';

export const MemberStatusSummarySection = memo(() => {
    const {currentSubscription} = useCurrentSubscription();

    const currentSeats = currentSubscription?.subscriptionSeats || [];

    const usingCount = currentSeats.filter((seat) => !!seat.teamMemberId).length.toLocaleString();

    const allSeatCount = currentSeats.length.toLocaleString();

    const willRemoveSeatCount = currentSeats
        .filter((seat) => !!seat.finishAt && seat.finishAt.getMonth() === new Date().getMonth())
        .length.toLocaleString();

    const removedSeatCount = currentSeats
        .filter((seat) => !!seat.finishAt && seat.finishAt < new Date())
        .length.toLocaleString();

    return (
        <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
            <StatusCard
                title={'현재 할당된 계정'}
                titleValue={usingCount}
                icon={<RiUser3Fill size={20} className="h-full w-full p-[6px] text-white" />}
                iconColor={'bg-purple-400'}
            />
            <StatusCard
                title={'구매한 계정'}
                titleValue={allSeatCount}
                icon={<RiUserFollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                iconColor={'bg-orange-400'}
            />
            <StatusCard
                title={'이번달 회수(예정) 계정'}
                titleValue={willRemoveSeatCount}
                icon={<RiUserUnfollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                iconColor={'bg-pink-400'}
            />
            <StatusCard
                title={'해지 완료된 계정'}
                titleValue={removedSeatCount}
                icon={<RiUserForbidFill size={20} className="h-full w-full p-[6px] text-white" />}
                iconColor={'bg-blue-400'}
            />
        </div>
    );
});
