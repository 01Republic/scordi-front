import React, {memo} from 'react';
import {AssignedSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/AssignedSeatCounter';
import {FinishTargetSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/FinishTargetSeatCounter';
import {PaidSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/PaidSeatCounter';
import {QuitStatusSeatCounter} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionMemberTab/SubscriptionSeatStatusSection/QuitStatusSeatCounter';

interface SubscriptionSeatStatusSectionProps {
    //
}

export const SubscriptionSeatStatusSection = memo(() => {
    return (
        <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
            {/* 현재 할당된 계정 */}
            <AssignedSeatCounter />

            {/* 구매한 계정 */}
            <PaidSeatCounter />

            {/* 이번달 회수(예정) 계정 */}
            <FinishTargetSeatCounter />

            {/* 해지 완료된 계정 */}
            <QuitStatusSeatCounter />
        </div>
    );
});
