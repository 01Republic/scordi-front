import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';

interface PayMethod {
    subscription: SubscriptionDto;
    lastPaidHistory: BillingHistoryDto | undefined;
}
export const PayMethod = memo((props: PayMethod) => {
    const {result} = useCreditCards();
    const {subscription, lastPaidHistory} = props;

    const creditCard = result.items.find((item) => item.id === subscription.creditCardId);
    const billingHistoryPayMethod = lastPaidHistory?.getPaymentMethod();

    // 엑섹 입력 후 해당 변수로 변경
    const payMethodText = creditCard?.name || billingHistoryPayMethod || '비어있음';

    // 엑셀 입력 후 삭제
    const payMethodText2: string =
        creditCard && creditCard.name
            ? creditCard.name
            : creditCard
            ? '별칭이 없어요'
            : billingHistoryPayMethod
            ? billingHistoryPayMethod
            : '비어있음';

    return (
        <div>
            <p className={`${!creditCard && !billingHistoryPayMethod && 'text-gray-300'} text-xs`}>{payMethodText2}</p>
        </div>
    );
});
