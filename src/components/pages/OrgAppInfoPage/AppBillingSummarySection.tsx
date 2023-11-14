import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {MobileGrid} from '^components/v2/MobileGridSection';
import {useBillingHistories} from '^hooks/useBillingHistories';

const sumOf = (arr: number[]) => arr.reduce((acc, a) => acc + a, 0);

type AppBillingSummarySectionProps = {} & WithChildren;

export const AppBillingSummarySection = memo((props: AppBillingSummarySectionProps) => {
    const {currentSubscription: application} = useCurrentSubscription();
    const billingHistoriesQueryResult = useBillingHistories();

    if (!application || !billingHistoriesQueryResult) return <></>;

    const {items: histories, pagination} = billingHistoriesQueryResult;

    const totalItemCount = pagination.totalItemCount;
    const totalPrice = sumOf(histories.map((h) => h.payAmount?.amount || 0));

    return (
        <MobileGrid.Section className="mb-3">
            <MobileGrid.Column>
                <MobileGrid.KeyValue label="결제 횟수" value={`${totalItemCount}건`} />
            </MobileGrid.Column>
            <MobileGrid.Column line={false}>
                <MobileGrid.KeyValue label="총 금액" value={`- US$${totalPrice}`} />
            </MobileGrid.Column>
        </MobileGrid.Section>
    );
});
