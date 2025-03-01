import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {SubscriptionProfile} from '^models/Subscription/components';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {BillingHistoryStatusTagUI, PayAmount, BillingHistoryTimestamp} from '^models/BillingHistory/components';
import {BillingHistoryAttachmentShowButton} from './BillingHistoryAttachmentShowButton';
import {BillingHistoryDeleteButton} from './BillingHistoryDeleteButton';

interface BillingHistoryRowOfInvoiceAccountProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
    reload: () => any;
    mode?: number;
}

export const BillingHistoryRowOfInvoiceAccount = memo((props: BillingHistoryRowOfInvoiceAccountProps) => {
    const {item: billingHistory, onSaved, reload, mode = 1} = props;

    const update = async (dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.success('문제가 발생했어요.'))
            .finally(() => onSaved && onSaved());
    };

    const {subscription} = billingHistory;

    return (
        <tr className="group text-14" data-id={billingHistory.id} onClick={() => console.log(billingHistory)}>
            {/*일시*/}
            <td>
                <BillingHistoryTimestamp billingHistory={billingHistory} />
            </td>

            {/*상태*/}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>
            {/*<td>{billingHistory.pageSubject}</td>*/}

            {/*내용*/}
            <td className="text-12 max-w-sm whitespace-pre-wrap">{billingHistory.title}</td>

            {/*연결된 구독*/}
            <td>{subscription && <SubscriptionProfile subscription={subscription} />}</td>

            {/*결제금액*/}
            <td>
                <PayAmount billingHistory={billingHistory} />
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

            {/* 다운로드 */}
            <td>
                <div className="flex items-center gap-2">
                    <BillingHistoryAttachmentShowButton billingHistory={billingHistory} />
                    {reload && <BillingHistoryDeleteButton billingHistory={billingHistory} reload={reload} />}
                </div>
            </td>
            {/*<td>{billingHistory.issuedAt}</td>*/}
            {/*<td>{billingHistory.invoiceUrl}</td>*/}
        </tr>
    );
});
BillingHistoryRowOfInvoiceAccount.displayName = 'BillingHistoryRowOfInvoiceAccount';
