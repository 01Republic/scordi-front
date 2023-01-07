import React, {memo} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {useBillingHistory} from '^hooks/useBillingHistories';
import {useRouter} from 'next/router';

type BillingHistoryAmountInfoBlockProps = {};

export const BillingHistoryAmountInfoBlock = memo((props: BillingHistoryAmountInfoBlockProps) => {
    const {} = props;
    const router = useRouter();
    const billingHistoryId = Number(router.query.billingHistoryId) || null;
    const {data: billingHistory, isLoading} = useBillingHistory(billingHistoryId);

    if (isLoading || !billingHistory) return <></>;

    return (
        <TitleSection.Title size="2xl" className="text-left py-3">
            <div className="font-bold">- US$ {billingHistory.paidAmount.toLocaleString()}</div>
        </TitleSection.Title>
    );
});
