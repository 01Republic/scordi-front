import React, {memo} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {useBillingHistory} from '^models/BillingHistory/hook';
import {useRouter} from 'next/router';
import {BillingHistoryDto} from '^models/BillingHistory/type';

type BillingHistoryAmountInfoBlockProps = {
    billingHistory: BillingHistoryDto;
};

export const BillingHistoryAmountInfoBlock = memo((props: BillingHistoryAmountInfoBlockProps) => {
    const {billingHistory} = props;

    return (
        <TitleSection.Title size="2xl" className="text-left py-3">
            {billingHistory.payAmount ? (
                <div className="font-bold">- US$ {billingHistory.payAmount.amount.toLocaleString()}</div>
            ) : (
                <div className="font-bold">-</div>
            )}
        </TitleSection.Title>
    );
});
