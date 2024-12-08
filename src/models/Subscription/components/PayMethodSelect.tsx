import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useCreditCards} from '^models/CreditCard/hook';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {CreditCardDto} from '^models/CreditCard/type';
import {subscriptionApi} from '^models/Subscription/api';
import {useToast} from '^hooks/useToast';
import {CreditCardProfileOption2} from '^models/CreditCard/components';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {BillingHistoryManager} from '^models/BillingHistory/manager';

interface PayMethodSelectProps {
    subscription: SubscriptionDto;
    onChange: (creditCard?: CreditCardDto) => any;
    ValueComponent?: (props: {value: CreditCardDto | string}) => JSX.Element;
}

export const PayMethodSelect = memo((props: PayMethodSelectProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {toast} = useToast();
    const {search, deleteCreditCard} = useCreditCards();

    const {subscription, onChange, ValueComponent = DefaultValueComponent} = props;

    const BillingHistory = BillingHistoryManager.init(subscription.billingHistories);
    const lastPaidHistory = BillingHistory.lastPaidHistory();

    // 구독의 결제수단과 마지막 결제내역의 결제수단이 등록되어 있는 경우
    // 두 결제수단을 비교해서 다를때만 툴팁 보이도록 구현
    const isShow =
        subscription.creditCard && lastPaidHistory && subscription.creditCardId !== lastPaidHistory.creditCardId;

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
            .finally(() => toast.success('변경사항을 저장했어요.'));
    };

    const optionDetach = async () => {
        return subscriptionApi
            .update(subscription.id, {creditCardId: null})
            .then(() => onChange())
            .finally(() => toast.success('연결을 해제했습니다'));
    };

    return (
        <div className="">
            <div className="overflow-x-hidden">
                <SelectColumn
                    fullWidth={false}
                    value={subscription.creditCard}
                    getOptions={getOptions}
                    ValueComponent={ValueComponent}
                    valueOfOption={(creditCard) => creditCard.id}
                    textOfOption={(creditCard) => creditCard.name || ''}
                    onSelect={onSelect}
                    inputDisplay
                    inputPlainText
                    optionListBoxTitle="결제수단을 변경할까요?"
                    optionDetach={optionDetach}
                    detachableOptionBoxTitle="연결된 결제수단"
                    optionDestroy={(creditCard) => {
                        return deleteCreditCard(creditCard, orgId).then((res) => {
                            if (res) onChange();
                            return true;
                        });
                    }}
                    EmptyComponent={() => <TagUI className="text-gray-300 w-60 !justify-start">비어있음</TagUI>}
                />
            </div>
            {/*{isShow && (*/}
            {/*    <div className="tooltip tooltip-error" data-tip="카드가 바뀌었는지 확인해보세요.">*/}
            {/*        <BsExclamation size={28} className="text-error animate-pulse" />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
});

const DefaultValueComponent = memo((props: {value: CreditCardDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <CreditCardProfileOption2 item={value} />;
});
