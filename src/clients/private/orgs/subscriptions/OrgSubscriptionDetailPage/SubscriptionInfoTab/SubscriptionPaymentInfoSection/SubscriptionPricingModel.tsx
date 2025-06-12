import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {
    PayingTypeSelect,
    PayingTypeTag,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';

interface SubscriptionPricingModelProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionPricingModel = memo((props: SubscriptionPricingModelProps) => {
    const {isEditMode, form, subscription} = props;

    return (
        <FormControl label="과금방식">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <PayingTypeSelect
                        defaultValue={subscription.pricingModel}
                        subscription={subscription}
                        onChange={(value) => form.setValue('pricingModel', value)}
                    />
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    <PayingTypeTag value={subscription.pricingModel} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
