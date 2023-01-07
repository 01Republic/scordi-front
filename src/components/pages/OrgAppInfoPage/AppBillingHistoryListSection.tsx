import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useBillingHistories} from '^hooks/useBillingHistories';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {PreLoader} from '^components/PreLoader';
import {useApplication} from '^hooks/useApplications';
import {BillingHistoryItem} from '^components/pages/OrgAppInfoPage/BillingHistoryItem';
import {BillingHistoryDto} from '^types/billing.type';

type AppBillingHistoryListSectionProps = {
    onClickMethod?: 'push' | 'replace' | undefined; // default: "push"
};

export const AppBillingHistoryListSection = memo((props: AppBillingHistoryListSectionProps) => {
    const {onClickMethod} = props;
    const router = useRouter();
    const applicationId = Number(router.query.appId);
    const {application} = useApplication(applicationId) || null;
    const {data: billingHistories, isLoading} = useBillingHistories(
        {
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        },
        [applicationId],
    );

    if (!application) return <></>;
    if (isLoading) return <PreLoader screenSize={false} />;

    const groupedList: {[key: string]: BillingHistoryDto[]} = {};
    billingHistories.forEach((item) => {
        const paidAt = new Date(item.paidAt);
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
                            application={application}
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
