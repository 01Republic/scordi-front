import React, {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';
import {useCurrentSubscription} from '../../atom';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {BillingCycleTypeTagUI} from '^models/Subscription/components';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {BillingCycleSelect} from './BillingCycleTypeSelect';

interface SubscriptionBillingCycleTypeProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionBillingCycleType = memo((props: SubscriptionBillingCycleTypeProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    const billingCycleType = useWatch({
        control: form.control,
        name: 'billingCycleType',
        defaultValue: subscription.billingCycleType,
    });

    return (
        <FormControl label="결제주기">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <BillingCycleSelect
                        billingCycle={billingCycleType || subscription.billingCycleType}
                        onChange={(value) => form.setValue('billingCycleType', value)}
                    />
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    <BillingCycleTypeTagUI value={subscription.billingCycleType} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
