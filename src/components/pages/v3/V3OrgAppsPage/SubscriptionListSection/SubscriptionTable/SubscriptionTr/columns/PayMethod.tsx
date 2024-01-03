import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface PayMethod {
    lastPaidHistory: BillingHistoryDto | undefined;
}
export const PayMethod = memo((props: PayMethod) => {
    const {lastPaidHistory} = props;

    const creditCard = lastPaidHistory?.creditCard;

    return (
        <div>
            <p className={`${!creditCard && 'text-gray-300'} text-xs`}>{creditCard?.name || '비어있음'}</p>
        </div>
    );
});
