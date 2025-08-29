import React, {memo} from 'react';

interface SubscriptionBillingHistoriesTableHeaderProps {}

export const SubscriptionBillingHistoriesTableHeader = memo((props: SubscriptionBillingHistoriesTableHeaderProps) => {
    return (
        <tr className="bg-slate-100">
            <th>일시</th>

            <th>상태</th>

            {/* 원화환산금액 */}
            <th>결제금액</th>

            {/* 원본화폐 */}
            <th>청구금액</th>

            <th>연결된 결제수단</th>

            <th>연결된 청구서메일</th>

            <th>비고</th>

            {/* 청구서 보기 */}
            <th />

            {/* 더보기 버튼 */}
            <th />
        </tr>
    );
});
SubscriptionBillingHistoriesTableHeader.displayName = 'SubscriptionBillingHistoriesTableHeader';
