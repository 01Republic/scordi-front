import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {currencyFormat} from '^utils/number';
import {CurrencyCode} from '^models/Money';
import {SubscriptionDto} from '^models/Subscription/types';
import {MonthsType} from '^models/_dashboard/type/Months.type';
import {selectedMonthAtom} from '^models/_dashboard/atom';
import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {SubscriptionListLayout} from './SubcriptionListLayout';

interface MonthSubscriptionItem {
    subscription: SubscriptionDto;
    issuedYearMonth: string;
    subscriptionId: number;
    amount: number;
    symbol: string;
    code: CurrencyCode;
}

interface YearlySubscriptionListSectionProps {
    monthsSubscriptionList: {month: string; items: MonthSubscriptionItem[]}[];
    orgId: number;
}

export const YearlySubscriptionListSection = memo((props: YearlySubscriptionListSectionProps) => {
    const {monthsSubscriptionList, orgId} = props;
    const selectedMonth: MonthsType = useRecoilValue(selectedMonthAtom);
    const router = useRouter();

    const matchedMonths = monthsSubscriptionList.find((entry) => `${entry.month.split('-')[1]}월` === selectedMonth);
    const matchedSubscriptionList = matchedMonths?.items.map((subscriptions) => subscriptions) ?? [];
    const matchedTotalAmount = matchedSubscriptionList
        .map((sub) => Math.floor(sub.amount))
        .reduce((total, current) => total + current, 0);

    const AllSubscriptionListShowButton = () => {
        return (
            <button
                onClick={() => router.push(`${orgId}/subscriptions`)}
                className="font-semibold text-14 text-gray-400 px-3"
            >
                전체보기
            </button>
        );
    };

    return (
        <DashboardLayout title="구독 리스트" className="!w-1/3" Buttons={AllSubscriptionListShowButton}>
            <ul className="w-full flex flex-col">
                {matchedSubscriptionList.map((item) => (
                    <SubscriptionListLayout
                        key={item.subscriptionId}
                        src={item.subscription.product.image}
                        name={item.subscription.product.nameKo}
                        percent={`${((Math.floor(item.amount) / matchedTotalAmount) * 100).toFixed(1)}%`}
                        amount={currencyFormat(Math.floor(item.amount))}
                    />
                ))}
            </ul>
        </DashboardLayout>
    );
});
