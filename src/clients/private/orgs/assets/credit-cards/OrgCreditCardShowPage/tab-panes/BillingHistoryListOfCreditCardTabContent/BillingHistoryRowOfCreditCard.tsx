import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {debounce} from 'lodash';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {SubscriptionProfile} from '^models/Subscription/components';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {BillingHistoryStatusTagUI, PayAmount, BillingHistoryTimestamp} from '^models/BillingHistory/components';

interface BillingHistoryRowOfCreditCardProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
}

export const BillingHistoryRowOfCreditCard = memo((props: BillingHistoryRowOfCreditCardProps) => {
    const {item: billingHistory, onSaved} = props;

    const update = debounce((dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.success('문제가 발생했어요.'))
            .finally(() => onSaved && onSaved());
    }, 250);

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

            {/*내용*/}
            <td className="text-12 max-w-sm whitespace-pre-wrap">{billingHistory.title}</td>

            {/*<td>{billingHistory.pageSubject}</td>*/}

            {/*결제금액*/}
            <td>
                <PayAmount billingHistory={billingHistory} />
            </td>

            {/*연결된 구독*/}
            <td>{billingHistory.subscription && <SubscriptionProfile subscription={billingHistory.subscription} />}</td>

            {/*비고*/}
            <td>
                <AirInputText
                    defaultValue={billingHistory.memo || undefined}
                    onChange={async (memo) => {
                        if (billingHistory.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>
            {/*<td>{yyyy_mm_dd_hh_mm(billingHistory.issuedAt)}</td>*/}
            {/*<td>{yyyy_mm_dd_hh_mm(billingHistory.createdAt)}</td>*/}
        </tr>
    );
});
BillingHistoryRowOfCreditCard.displayName = 'BillingHistoryRowOfCreditCard';
