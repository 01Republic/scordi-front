import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {CreditCardProfileCompact, CreditCardSelect} from '^models/CreditCard/components';
import {useCreditCardOfSubscription} from '../../hooks';

interface SubscriptionCreditCardProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionCreditCard = memo((props: SubscriptionCreditCardProps) => {
    const {isEditMode, form, subscription} = props;
    const creditCardQuery = useCreditCardOfSubscription(subscription);

    const defaultCreditCard = creditCardQuery.data || subscription.creditCard;

    return (
        <FormControl label="연결된 카드">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <CreditCardSelect
                        defaultValue={defaultCreditCard}
                        onChange={(creditCard) => {
                            form.setValue('creditCardId', creditCard?.id || null);
                        }}
                        ValueComponent={(props) => {
                            const {value} = props;
                            return typeof value === 'string' ? (
                                <p>{value}</p>
                            ) : (
                                <CreditCardProfileCompact item={value} />
                            );
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    <CreditCardProfileCompact item={defaultCreditCard} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
