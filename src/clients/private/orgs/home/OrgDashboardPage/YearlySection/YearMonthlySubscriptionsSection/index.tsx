import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {HiOutlineSquaresPlus} from 'react-icons/hi2';
import {orgIdParamState} from '^atoms/common';
import {firstDayOfMonth, firstDayOfYear, monthAfter, yearAfter} from '^utils/dateTime';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
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

    if (!pagination.totalItemCount) {
        return (
            <EmptyTableLayout
                title="구독 리스트"
                Icon={HiOutlineSquaresPlus}
                url={orgId ? OrgSubscriptionSelectPageRoute.path(orgId) : '#'}
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
            className="max-h-[826px]"
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
