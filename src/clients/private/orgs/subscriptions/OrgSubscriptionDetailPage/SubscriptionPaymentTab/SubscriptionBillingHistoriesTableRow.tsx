import {BillingHistoryAttachmentShowButton} from '^clients/private/_components/button/BillingHistoryAttachmentShowButton';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryStatusTagUI, PayAmount} from '^models/BillingHistory/components';
import {BillingHistoryDto, BillingHistoryStatus, UpdateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {yyyy_mm_dd} from '^utils/dateTime';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';

interface SubscriptionBillingHistoriesTableRowProps {
    billingHistory: BillingHistoryDto;
    reload?: () => any;
}

export const SubscriptionBillingHistoriesTableRow = memo((props: SubscriptionBillingHistoriesTableRowProps) => {
    const {billingHistory, reload} = props;
    const {organizationId} = billingHistory;
    const {t} = useTranslation('subscription');

    const update = async (dto: UpdateBillingHistoryRequestDto) => {
        const {id, organizationId: orgId} = billingHistory;
        return appBillingHistoryApi
            .updateV2(id, dto)
            .then(() => toast.success(t('toast.saveSuccess')))
            .catch(() => toast.error(t('toast.saveError')))
            .finally(() => reload && reload());
    };

    const handleShowInvoice = () => {
        if (!billingHistory.invoiceUrl) {
            toast.success(t('toast.noInvoice'));
        } else {
            window.open(billingHistory.invoiceUrl, '_blank');
        }
    };

    const payFail = billingHistory.about === BillingHistoryStatus.PayFail;
    const paidAtDate = payFail
        ? yyyy_mm_dd(billingHistory.issuedAt)
        : billingHistory.paidAt
        ? yyyy_mm_dd(billingHistory.paidAt)
        : '';

    return (
        <tr className="group">
            {/* 카드 프로필 */}
            <td className={'text-14'}>{paidAtDate}</td>

            {/* 상태 */}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>

            {/* 결제금액 */}
            <td className={'text-14'}>
                {billingHistory.payAmount?.amount ? <PayAmount billingHistory={billingHistory} /> : '-'}
            </td>

            {/* 연결된 결제수단 */}
            <td>
                {billingHistory.creditCard ? (
                    <OpenButtonColumn
                        href={OrgCreditCardShowPageRoute.path(organizationId, billingHistory.creditCard.id)}
                    >
                        <CreditCardProfileCompact item={billingHistory.creditCard} />
                    </OpenButtonColumn>
                ) : (
                    <EmptyValue />
                )}
            </td>

            {/* 연결된 청구서 수신 메일 */}
            <td>
                {billingHistory.invoiceApp?.invoiceAccount ? (
                    <OpenButtonColumn
                        href={OrgInvoiceAccountShowPageRoute.path(
                            organizationId,
                            billingHistory.invoiceApp?.invoiceAccount.id,
                        )}
                    >
                        <InvoiceAccountProfileCompact invoiceAccount={billingHistory.invoiceApp?.invoiceAccount} />
                    </OpenButtonColumn>
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
                <BillingHistoryAttachmentShowButton billingHistory={billingHistory} />
            </td>
        </tr>
    );
});
SubscriptionBillingHistoriesTableRow.displayName = 'SubscriptionBillingHistoriesTableRow';
