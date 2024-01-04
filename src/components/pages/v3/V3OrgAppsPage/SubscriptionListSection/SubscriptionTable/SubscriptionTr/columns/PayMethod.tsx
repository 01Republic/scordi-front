import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';

interface PayMethod {
    lastPaidHistory: BillingHistoryDto | undefined;
    subscription: SubscriptionDto;
}
export const PayMethod = memo((props: PayMethod) => {
    const {result} = useCreditCards();
    const {subscription} = props;

    const creditCard = result.items.find((item) => item.id === subscription.creditCardId);

    return (
        <div>
            <p className={`${!creditCard && 'text-gray-300'} text-xs`}>
                {creditCard?.name && creditCard?.name}
                {creditCard && !creditCard.name && '별칭이 없어요'}
                {!creditCard && '비어있음'}
            </p>
        </div>
    );
});
