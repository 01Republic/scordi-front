import React, {memo} from 'react';
import {useCurrentSubscription} from '../../atom';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {CreditCardProfileCompact, CreditCardSelect} from '^models/CreditCard/components';
import {UseFormReturn} from 'react-hook-form';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';

interface SubscriptionCreditCardProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionCreditCard = memo((props: SubscriptionCreditCardProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="연결된 카드">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <CreditCardSelect
                        defaultValue={subscription.creditCard}
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
                    <CreditCardProfileCompact item={subscription.creditCard} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
