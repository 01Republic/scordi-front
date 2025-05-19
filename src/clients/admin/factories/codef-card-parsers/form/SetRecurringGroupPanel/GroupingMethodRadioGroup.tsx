import React, {memo, useState} from 'react';
import {GroupingMethod} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {GroupingMethodRadioCard, RadioCardContent, RadioCardTitle} from './GroupingMethodRadioCard';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {FixRecurringTypeHandler} from './FixRecurringTypeHandler';

interface GroupingMethodRadioGroupProps {
    onChange: (selectedMethod: GroupingMethod, fixedRecurringType?: BillingCycleOptions) => any;
    defaultValue?: GroupingMethod;
    defaultFixedRecurringType?: BillingCycleOptions | null;
}

export const GroupingMethodRadioGroup = memo((props: GroupingMethodRadioGroupProps) => {
    const {onChange, defaultValue = GroupingMethod.byDate, defaultFixedRecurringType = null} = props;
    const [method, setMethod] = useState(defaultValue);

    const changeMethod = (value: GroupingMethod, fixedRecurringType?: BillingCycleOptions) => {
        onChange(value, fixedRecurringType);
        setMethod(value);
    };

    const changeFixedRecurringType = (fixedRecurringType?: BillingCycleOptions) => {
        changeMethod(GroupingMethod.byCard, fixedRecurringType);
    };

    return (
        <>
            <GroupingMethodRadioCard
                value={GroupingMethod.byDate}
                defaultChecked={defaultValue === GroupingMethod.byDate}
                onChange={changeMethod}
            >
                <RadioCardTitle text="1. 날짜별로 묶을래요. (기본)" />
                <RadioCardContent text="고정일자에 결제되고 있어요" />
            </GroupingMethodRadioCard>

            <GroupingMethodRadioCard
                value={GroupingMethod.byCard}
                defaultChecked={defaultValue === GroupingMethod.byCard}
                onChange={changeMethod}
            >
                <RadioCardTitle text="2. 카드 단위로 묶을래요." />
                <RadioCardContent text="날짜와 무관하게 한 개 카드 내에서 감지되는 결제내역은 전부 하나의 구독으로 넣을래요" />
                {method === GroupingMethod.byCard && (
                    <div className="pt-2">
                        <FixRecurringTypeHandler
                            defaultValue={defaultFixedRecurringType}
                            onChange={changeFixedRecurringType}
                        />
                    </div>
                )}
            </GroupingMethodRadioCard>

            <GroupingMethodRadioCard
                value={GroupingMethod.byMessage}
                defaultChecked={defaultValue === GroupingMethod.byMessage}
                onChange={changeMethod}
                disabled
            >
                <RadioCardTitle text="3. 결제 메세지에 따라 묶을래요." />
                <RadioCardContent text="결제 메세지에 구독의 구분자가 있어요." />
            </GroupingMethodRadioCard>
        </>
    );
});
GroupingMethodRadioGroup.displayName = 'GroupingMethodRadioGroup';
