import React, {memo} from 'react';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {CreditCardDto} from '^models/CreditCard/type';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {CreditCardProfileOption} from '^models/CreditCard/hook/components/CreditCardProfile';
import {creditCardApi} from '^models/CreditCard/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface PayMethodSelectProps {
    subscription: SubscriptionDto;
    onChange: (creditCard?: CreditCardDto) => any;
    lastPaidHistory: BillingHistoryDto | undefined;
}

export const PayMethodSelect = memo((props: PayMethodSelectProps) => {
    const ordId = useRecoilValue(orgIdParamState);
    const {toast} = useToast();
    const {search, deleteCreditCard} = useCreditCards();
    const orgId = useRecoilValue(orgIdParamState);

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

    const optionDetach = async () => {
        return subscriptionApi
            .update(subscription.id, {creditCardId: null})
            .then(() => onChange())
            .finally(() => toast.success('연결을 해제했습니다'));
    };

    return (
        <div className="w-40 overflow-x-hidden">
            <SelectColumn
                value={subscription.creditCard}
                getOptions={getOptions}
                ValueComponent={PayMethodOption}
                valueOfOption={(creditCard) => creditCard.id}
                textOfOption={(creditCard) => creditCard.name || ''}
                onSelect={onSelect}
                inputDisplay
                inputPlainText
                optionListBoxTitle="결제수단을 변경할까요?"
                optionDetach={optionDetach}
                detachableOptionBoxTitle="연결된 결제수단"
                optionDestroy={(creditCard) => {
                    return deleteCreditCard(creditCard, orgId).then(() => {
                        toast.success('삭제되었습니다.');
                        return true;
                    });
                }}
                EmptyComponent={() => <TagUI className="text-gray-300 w-60 !justify-start">비어있음</TagUI>}
            />
        </div>
    );
});

const PayMethodOption = memo((props: {value: CreditCardDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <CreditCardProfileOption item={value} />;
});
