import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import React from 'react';
import {Avatar} from '^components/Avatar';

interface SubscriptionListSectionProps {}

export const SubscriptionListSection = (props: SubscriptionListSectionProps) => {
    const AllSubscriptionListShowButton = () => {
        return <button className="font-semibold text-14 text-gray-400 px-3">전체보기</button>;
    };

    return (
        <DashboardLayout title="구독 리스트" className="!w-1/3" Buttons={AllSubscriptionListShowButton}>
            <ul className="w-full flex flex-col">
                <li className="w-full py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-5 h-5" draggable={false} loading="lazy" />
                        <p>슬랙</p>
                        <p>30%</p>
                    </div>
                    <p>- 700,000원</p>
                </li>
                <li className="w-full py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-5 h-5" draggable={false} loading="lazy" />
                        <p>슬랙</p>
                        <p>30%</p>
                    </div>
                    <p>- 700,000원</p>
                </li>
                <li className="w-full py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-5 h-5" draggable={false} loading="lazy" />
                        <p>슬랙</p>
                        <p>30%</p>
                    </div>
                    <p>- 700,000원</p>
                </li>
            </ul>
        </DashboardLayout>
    );
};
