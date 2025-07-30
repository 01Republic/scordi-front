import React, {memo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {SubscriptionDto} from '^models/Subscription/types';
import {useSubscription3} from '^models/Subscription/hook';
import {useFormContext} from 'react-hook-form';
import {ContentBox} from './ContentBox';
import {SubscriptionSelect} from '^_components/dropdown-select/SubscriptionSelect';
import {ManualPaymentHistoryRegisterForm} from '^clients/private/_modals/ManualBillingHistoryModal/form-types';

interface SubscriptionContentProps {
    defaultValue?: SubscriptionDto;
}

export const SubscriptionContent = memo((props: SubscriptionContentProps) => {
    const {defaultValue} = props;
    const orgId = useOrgIdParam();
    const {setValue, register} = useFormContext<ManualPaymentHistoryRegisterForm>();
    const {reload, result, isLoading} = useSubscription3(
        orgId,
        {
            where: {organizationId: defaultValue?.organizationId},
        },
        true,
    );

    return (
        <ContentBox label="구독">
            <input type="hidden" {...register('subscriptionId')} />
            <SubscriptionSelect
                defaultValue={defaultValue || undefined}
                isLoading={isLoading}
                subscription={result.items}
                onSelect={(item) => setValue('subscriptionId', item.id, {shouldValidate: true})}
                onOpen={() => {
                    reload();
                }}
                readonly={!!defaultValue}
            />
        </ContentBox>
    );
});
