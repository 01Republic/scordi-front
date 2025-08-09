import {orgIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {useDashboardSubscriptionSpends} from '^models/_dashboard/hook';
import {
    DashboardSummaryYearMonthlyItemDto,
    DashboardSummaryYearMonthlyResultDto,
    FindAllSubscriptionSpendsQueryDto,
} from '^models/_dashboard/type';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {firstDayOfMonth, firstDayOfYear, monthAfter, yearAfter} from '^utils/dateTime';
import {LayoutGrid} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
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
    const {t} = useTranslation('dashboard');
    const {t: tCommon} = useTranslation('common');
    const {data: paginatedSubscriptionSpends, isFetched} = useDashboardSubscriptionSpends(
        orgId,
        getParams(year, monthlyItem?.month),
    );
    const isLoading = !isFetched;
    const {items, pagination} = paginatedSubscriptionSpends;

    if (!isLoading && !pagination.totalItemCount) {
        return (
            <EmptyTableLayout
                title={t('sections.subscriptionList')}
                Icon={LayoutGrid}
                url={orgId ? OrgSubscriptionConnectionPageRoute.path(orgId) : '#'}
                className="h-full"
            />
        );
    }

    const AllSubscriptionListShowButton = () => (
        <LinkTo href={OrgSubscriptionListPageRoute.path(orgId)} className="font-semibold text-14 text-gray-400">
            {tCommon('button.viewAll')}
        </LinkTo>
    );

    return (
        <DashboardSectionLayout
            title={t('sections.subscriptionList')}
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
