import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {BillingHistoryDto, UpdateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {BillingHistoryStatusTagUI} from '^models/BillingHistory/components';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';

interface SubscriptionBillingHistoriesTableRowProps {
    billingHistory: BillingHistoryDto;
    reload?: () => any;
}

export const SubscriptionBillingHistoriesTableRow = memo((props: SubscriptionBillingHistoriesTableRowProps) => {
    const {billingHistory, reload} = props;

    const update = async (dto: UpdateBillingHistoryRequestDto) => {
        const {id, organizationId: orgId} = billingHistory;
        return appBillingHistoryApi
            .updateV2(id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.error('문제가 발생했어요.'))
            .finally(() => reload && reload());
    };

    const handleShowInvoice = () => {
        if (!billingHistory.invoiceUrl) {
            toast.success('청구서가 없어요.');
        } else {
            window.open(billingHistory.invoiceUrl, '_blank');
        }
    };

    return (
        <tr className="group">
            {/* 카드 프로필 */}
            <td className={'text-14'}>{billingHistory.paidAt ? yyyy_mm_dd(billingHistory.paidAt) : ''}</td>

            {/* 상태 */}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>

            {/* 결제금액 */}
            <td className={'text-14'}>
                {billingHistory.payAmount?.symbol} {billingHistory.payAmount?.amount.toLocaleString()}
            </td>

            {/* 연결된 결제수단 */}
            <td>
                {billingHistory.creditCard ? (
                    <CreditCardProfileCompact item={billingHistory.creditCard} />
                ) : (
                    <EmptyValue />
                )}
            </td>

            {/* 연결된 청구서 수신 메일 */}
            <td>
                {billingHistory.invoiceApp?.invoiceAccount ? (
                    <InvoiceAccountProfile invoiceAccount={billingHistory.invoiceApp?.invoiceAccount} />
                ) : (
                    <EmptyValue />
                )}
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={billingHistory.memo || undefined}
                    onChange={async (memo) => {
                        if (billingHistory.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/* 청구서 보기 */}
            <td>
                <button className={'btn btn-outline btn-sm text-14'} onClick={handleShowInvoice}>
                    청구서 보기
                </button>
            </td>
        </tr>
    );
});
SubscriptionBillingHistoriesTableRow.displayName = 'SubscriptionBillingHistoriesTableRow';
