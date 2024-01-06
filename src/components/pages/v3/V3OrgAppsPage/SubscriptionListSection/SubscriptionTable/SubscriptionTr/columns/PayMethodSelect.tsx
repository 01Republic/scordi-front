import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {CreditCardDto} from '^models/CreditCard/type';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {CreditCardProfile} from '^models/CreditCard/hook/components/CreditCardProfile';

interface PayMethodSelectProps {
    subscription: SubscriptionDto;
    onChange: (creditCard: CreditCardDto) => any;
    lastPaidHistory: BillingHistoryDto | undefined;
}

export const PayMethodSelect = memo((props: PayMethodSelectProps) => {
    const {toast} = useToast();
    const {search} = useCreditCards();
    // const {loadCurrentSubscription} = useCurrentSubscription();
    const {subscription, onChange, lastPaidHistory} = props;

    const creditCard = subscription.creditCard;
    const billingHistoryPayMethod = lastPaidHistory?.getPaymentMethod();
    const payMethodText = creditCard?.name || billingHistoryPayMethod || '비어있음';

    const getOptions = async (keyword?: string) => {
        return search(
            {
                keyword,
                itemsPerPage: 0,
            },
            false,
            true,
        ).then((res) => res?.items || []);
    };

    const onSelect = async (creditCard: CreditCardDto) => {
        if (creditCard.id === subscription.creditCard?.id) return;

        return subscriptionApi
            .update(subscription.id, {creditCardId: creditCard.id})
            .then(() => onChange(creditCard))
            .finally(() => toast.success('저장했습니다'));
    };

    return (
        <SelectColumn
            value={subscription.creditCard}
            getOptions={getOptions}
            ValueComponent={PayMethodTag}
            valueOfOption={(creditCard) => creditCard.id}
            textOfOption={(creditCard) => creditCard.name || ''}
            onSelect={onSelect}
            inputDisplay
            inputPlainText
            optionListBoxTitle="결제수단을 변경합니다"
        />
    );
});

const PayMethodTag = memo((props: {value: CreditCardDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <CreditCardProfile item={value} />;
});
