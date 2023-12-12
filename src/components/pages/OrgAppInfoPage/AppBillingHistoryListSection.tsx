import React, {memo} from 'react';
import {useBillingHistories} from '^models/BillingHistory/hook';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {PreLoader} from '^components/PreLoader';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {BillingHistoryItem} from '^components/pages/OrgAppInfoPage/BillingHistoryItem';
import {BillingHistoryDto} from '^models/BillingHistory/type';

type AppBillingHistoryListSectionProps = {
    onClickMethod?: 'push' | 'replace' | undefined; // default: "push"
};

export const AppBillingHistoryListSection = memo((props: AppBillingHistoryListSectionProps) => {
    const {onClickMethod} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();
    const billingHistoriesQueryResult = useBillingHistories();

    if (!subscription || !billingHistoriesQueryResult) return <PreLoader screenSize={false} />;

    const {items: billingHistories} = billingHistoriesQueryResult;

    const groupedList: {[key: string]: BillingHistoryDto[]} = {};
    billingHistories.forEach((item) => {
        const paidAt = new Date(item.paidAt!);
        const now = new Date();

        const bits: string[] = [];
        if (paidAt.getFullYear() !== now.getFullYear()) bits.push(`${paidAt.getFullYear()}년`);
        if (paidAt.getMonth() !== now.getMonth()) bits.push(`${paidAt.getMonth() + 1}월`);
        bits.push(`${paidAt.getDate()}일`);
        const key = bits.join(' ');

        groupedList[key] ||= [];
        groupedList[key].push(item);
    });

    return (
        <>
            {Object.entries(groupedList).map(([key, list], i) => (
                <MobileEntityListSection
                    key={i}
                    padding={false}
                    listOfData={list}
                    groupTitle={<span className="text-gray-500">{key}</span>}
                    itemCustomRender={(billingHistory, i) => (
                        <BillingHistoryItem
                            subscription={subscription}
                            billingHistory={billingHistory}
                            onClickMethod={onClickMethod}
                            key={i}
                        />
                    )}
                />
            ))}
        </>
    );
});
