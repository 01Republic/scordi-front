import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {firstDayOfMonth, firstDayOfYear, monthAfter, yearAfter} from '^utils/dateTime';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {
    DashboardSummaryYearMonthlyItemDto,
    DashboardSummaryYearMonthlyResultDto,
    FindAllSubscriptionSpendsQueryDto,
} from '^models/_dashboard/type';
import {useDashboardSubscriptionSpends} from '^models/_dashboard/hook';
import {LinkTo} from '^components/util/LinkTo';
import {DashboardSectionLayout} from '../../DashboardSectionLayout';
import {EmptyTableLayout} from '../../EmptyTableLayout';
import {PaidSubscriptionSpendItem} from './PaidSubscriptionSpendItem';
import {LayoutGrid} from 'lucide-react';

interface YearMonthlySubscriptionsSectionProps {
    year: number;
    result?: DashboardSummaryYearMonthlyResultDto;
    isLoading?: boolean;
    monthlyItem?: DashboardSummaryYearMonthlyItemDto;
}

export const YearMonthlySubscriptionsSection = memo((props: YearMonthlySubscriptionsSectionProps) => {
    const {year, result, monthlyItem} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {data: paginatedSubscriptionSpends, isFetched} = useDashboardSubscriptionSpends(
        orgId,
        getParams(year, monthlyItem?.month),
    );
    const isLoading = !isFetched;
    const {items, pagination} = paginatedSubscriptionSpends;

    if (!isLoading && !pagination.totalItemCount) {
        return (
            <EmptyTableLayout
                title="구독 리스트"
                Icon={LayoutGrid}
                url={orgId ? OrgSubscriptionConnectionPageRoute.path(orgId) : '#'}
                className="h-full"
            />
        );
    }

    const AllSubscriptionListShowButton = () => (
        <LinkTo href={OrgSubscriptionListPageRoute.path(orgId)} className="font-semibold text-14 text-gray-400">
            전체보기
        </LinkTo>
    );

    return (
        <DashboardSectionLayout
            title="구독 리스트"
            Buttons={AllSubscriptionListShowButton}
            isLoading={isLoading}
            className="h-[826px]"
        >
            <ul className="w-full flex flex-col">
                {items.map((item) => (
                    <PaidSubscriptionSpendItem
                        key={item.subscriptionId}
                        amount={item.amount}
                        subscription={item.subscription}
                    />
                ))}
            </ul>
        </DashboardSectionLayout>
    );
});

function getParams(year: number, month?: number): FindAllSubscriptionSpendsQueryDto {
    if (month) {
        const date = new Date(year, month - 1, 1, 9);
        const from = firstDayOfMonth(date);
        const to = monthAfter(1, from);
        return {from, to, order: {amount: 'DESC', historyCount: 'DESC', subscriptionId: 'DESC'}};
    } else {
        const date = new Date(year, 0, 1, 9);
        const from = firstDayOfYear(date);
        const to = yearAfter(1, from);
        return {from, to, order: {amount: 'DESC', historyCount: 'DESC', subscriptionId: 'DESC'}};
    }
}
