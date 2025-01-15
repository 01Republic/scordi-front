import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {DashboardSummaryYearMonthlyItemDto, DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {LinkTo} from '^components/util/LinkTo';
import {DashboardSectionLayout} from '../../DashboardSectionLayout';
import {SubscriptionSpendsForMonth} from './SubscriptionSpendsForMonth';
import {SubscriptionSpendsForYear} from './SubscriptionSpendsForYear';
import {EmptyTableLayout} from '^clients/private/orgs/home/OrgDashboardPage/EmptyTableLayout';
import {HiOutlineSquaresPlus} from 'react-icons/hi2';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';

interface YearMonthlySubscriptionsSectionProps {
    result?: DashboardSummaryYearMonthlyResultDto;
    isLoading?: boolean;
    monthlyItem?: DashboardSummaryYearMonthlyItemDto;
}

export const YearMonthlySubscriptionsSection = memo((props: YearMonthlySubscriptionsSectionProps) => {
    const {result, isLoading, monthlyItem} = props;
    const orgId = useRecoilValue(orgIdParamState);

    if (monthlyItem ? monthlyItem.serviceCount === 0 : !result?.subscriptionSpends.length) {
        return (
            <EmptyTableLayout
                title="구독"
                Icon={HiOutlineSquaresPlus}
                url={orgId ? OrgSubscriptionSelectPageRoute.path(orgId) : '#'}
                className="h-full"
            />
        );
    }

    const AllSubscriptionListShowButton = () => (
        <LinkTo href={OrgSubscriptionListPageRoute.path(orgId)} className="font-semibold text-14 text-gray-400 px-3">
            전체보기
        </LinkTo>
    );

    return (
        <DashboardSectionLayout
            title="구독 리스트"
            Buttons={AllSubscriptionListShowButton}
            isLoading={isLoading}
            className="h-full"
        >
            {monthlyItem ? (
                <SubscriptionSpendsForMonth monthlyItem={monthlyItem} />
            ) : (
                <SubscriptionSpendsForYear result={result} />
            )}
        </DashboardSectionLayout>
    );
});
