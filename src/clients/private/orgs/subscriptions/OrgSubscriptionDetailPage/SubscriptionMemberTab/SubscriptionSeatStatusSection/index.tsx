import React, {memo} from 'react';
import {PaidSeatCounter} from './PaidSeatCounter';
import {AssignedSeatCounter} from './AssignedSeatCounter';
import {QuitStatusSeatCounter} from './QuitStatusSeatCounter';
import {FinishTargetSeatCounter} from './FinishTargetSeatCounter';

interface SubscriptionSeatStatusSectionProps {
    //
}

export const SubscriptionSeatStatusSection = memo(() => {
    return (
        <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
            {/* 이용중인 시트 */}
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
