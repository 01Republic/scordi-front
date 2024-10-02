import React, {memo} from 'react';
import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {BillingHistoryStatusTagUI} from '^models/BillingHistory/components/BillingHistoryStatusTagUI';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {toast} from 'react-hot-toast';
import {BillingHistoryAttachmentShowButton} from './BillingHistoryAttachmentShowButton';

interface BillingHistoryRowOfInvoiceAccountProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
    mode?: number;
}

export const BillingHistoryRowOfInvoiceAccount = memo((props: BillingHistoryRowOfInvoiceAccountProps) => {
    const {item: billingHistory, onSaved, mode = 1} = props;

    const update = async (dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.success('문제가 발생했습니다'))
            .finally(() => onSaved && onSaved());
    };

    const PaidAmount = () => {
        if (!billingHistory.payAmount) return <></>;

        const {payAmount} = billingHistory;
        const {code, amount, symbol, format} = payAmount;
        const {exchangedCurrency, dollarPrice, exchangeRate} = payAmount;

        return (
            <div className={`flex items-center gap-1 justify-end ${billingHistory.paidAt ? '' : 'text-red-400'}`}>
                <span>{symbol}</span>
                <span>{Math.round(amount).toLocaleString()}</span>
            </div>
        );
    };

    const {issuedAt, subscription} = billingHistory;

    return (
        <tr className="group text-14" data-id={billingHistory.id}>
            {/*서비스명*/}
            <td>
                {subscription && (
                    <SubscriptionProfile subscription={subscription}>
                        <p className="truncate text-sm">
                            {subscription.product.name()} {subscription.alias ? `- ${subscription.alias}` : ''}
                        </p>
                        <p className="text-12 text-gray-400">
                            {issuedAt.getFullYear()}년 {issuedAt.getMonth() + 1}월 청구
                        </p>
                    </SubscriptionProfile>
                )}
            </td>

            {/*발행일*/}
            <td>
                {billingHistory.paidAt ? (
                    yyyy_mm_dd(billingHistory.paidAt)
                ) : (
                    <span className="text-red-400">{yyyy_mm_dd(billingHistory.issuedAt)}</span>
                )}
            </td>

            {/*구분*/}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>
            {/*<td>{billingHistory.pageSubject}</td>*/}

            {/*결제금액*/}
            <td>
                <PaidAmount />
            </td>

            {/*내용*/}
            <td className="text-12 max-w-sm whitespace-pre-wrap">
                <p className="text-12">{billingHistory.title}</p>
            </td>

            {/* 다운로드 */}
            <td>
                <BillingHistoryAttachmentShowButton billingHistory={billingHistory} />
            </td>

            {/*/!*비고*!/*/}
            {/*<td>*/}
            {/*    <AirInputText*/}
            {/*        defaultValue={billingHistory.memo || undefined}*/}
            {/*        onChange={async (memo) => {*/}
            {/*            if (billingHistory.memo === memo) return;*/}
            {/*            return update({memo});*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</td>*/}
            {/*<td>{billingHistory.issuedAt}</td>*/}
            {/*<td>{billingHistory.invoiceUrl}</td>*/}
        </tr>
    );
});
BillingHistoryRowOfInvoiceAccount.displayName = 'BillingHistoryRowOfInvoiceAccount';
