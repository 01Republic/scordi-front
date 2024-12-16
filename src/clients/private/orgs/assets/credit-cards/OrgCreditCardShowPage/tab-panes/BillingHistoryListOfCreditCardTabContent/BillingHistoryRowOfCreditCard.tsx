import React, {memo} from 'react';
import {BillingHistoryDto, UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {BillingHistoryStatusTagUI} from '^models/BillingHistory/components/BillingHistoryStatusTagUI';
import {SubscriptionProfile} from '^models/Subscription/components/SubscriptionProfile';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {toast} from 'react-hot-toast';

interface BillingHistoryRowOfCreditCardProps {
    item: BillingHistoryDto;
    onSaved?: () => any;
}

export const BillingHistoryRowOfCreditCard = memo((props: BillingHistoryRowOfCreditCardProps) => {
    const {item: billingHistory, onSaved} = props;

    const update = async (dto: UpdateBillingHistoryRequestDtoV2) => {
        return billingHistoryApi
            .updateV2(billingHistory.id, dto)
            .then(() => toast.success('변경사항을 저장했어요.'))
            .catch(() => toast.success('문제가 발생했어요.'))
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

    return (
        <tr className="group text-14" data-id={billingHistory.id} onClick={() => console.log(billingHistory)}>
            {/*일시*/}
            <td>
                {billingHistory.paidAt ? (
                    yyyy_mm_dd_hh_mm(billingHistory.paidAt)
                ) : (
                    <span className="text-red-400">{yyyy_mm_dd_hh_mm(billingHistory.issuedAt)}</span>
                )}
            </td>

            {/*상태*/}
            <td>
                <BillingHistoryStatusTagUI billingHistory={billingHistory} />
            </td>

            {/*내용*/}
            <td>{billingHistory.title}</td>

            {/*<td>{billingHistory.pageSubject}</td>*/}

            {/*결제금액*/}
            <td>
                <PaidAmount />
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
