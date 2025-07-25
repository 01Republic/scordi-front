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
        <div className="bg-gray-200 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 rounded">
            {/* 이용중인 시트 */}
            <AssignedSeatCounter />

            {/* 구매된 시트 */}
            <PaidSeatCounter />

            {/* 이번달 회수(예정) 계정 */}
            <FinishTargetSeatCounter />

            {/* 해지 완료된 계정 */}
            <QuitStatusSeatCounter />
        </div>
    );
});
