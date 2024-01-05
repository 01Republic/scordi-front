import {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {CreditCardDto} from '^models/CreditCard/type';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';

interface PayMethod {
    subscription: SubscriptionDto;
    lastPaidHistory: BillingHistoryDto | undefined;
    onChange: (value: string) => any;
}

const getCurrentCard = (value: string | boolean, result: CreditCardDto[]) => {
    return result.filter((item) => {
        return item.name === value;
    });
};

export const PayMethod = memo((props: PayMethod) => {
    const {result} = useCreditCards();
    const {toast} = useToast();
    const {subscription, lastPaidHistory, onChange} = props;

    const creditCard = result.items.find((item) => item.id === subscription.creditCardId);
    const billingHistoryPayMethod = lastPaidHistory?.getPaymentMethod();
    const payMethodText = creditCard?.name || billingHistoryPayMethod || '비어있음';

    const onSelect = async (e: string) => {
        if (!subscription.id || !e) return;

        const creditCardId = getCurrentCard(e, result.items)[0].id;
        const subscriptionId = subscription.id;

        return subscriptionApi
            .update(subscriptionId, {creditCardId})
            .then(() => onChange(e))
            .finally(() => toast.success('저장했습니다'));
    };

    const options = result.items.map((item) => {
        return item.name;
    });

    return (
        <SelectColumn
            value={payMethodText}
            getOptions={async () => options}
            onSelect={(e) => onSelect(e!)}
            ValueComponent={IsPayMethodTag}
            inputDisplay={true}
        />
    );
});

const IsPayMethodTag = memo((props: {value: boolean | string}) => {
    const {result} = useCreditCards();
    const {value} = props;

    const cardId = getCurrentCard.length ? getCurrentCard(value, result.items)[0]?.id : Math.random();
    const tagColor = getColor(value.toString().length + cardId, palette.notionColors);
    const colorClass = value === '비어있음' ? 'text-gray-300' : `${tagColor}`;

    return <TagUI className={colorClass}>{value}</TagUI>;
});
