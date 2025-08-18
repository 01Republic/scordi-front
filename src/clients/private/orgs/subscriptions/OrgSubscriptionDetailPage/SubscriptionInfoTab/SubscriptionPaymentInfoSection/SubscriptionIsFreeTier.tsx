import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {FreeTierSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/FreeTireSelect';
import {IsFreeTierTagUI} from '^models/Subscription/components';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';

interface SubscriptionIsFreeTierProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionIsFreeTier = memo((props: SubscriptionIsFreeTierProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, subscription} = props;

    const isFreeTier = useWatch({
        control: form.control,
        name: 'isFreeTier',
        defaultValue: subscription.isFreeTier,
    });

    return (
        <FormControl label={t('detail.paymentInfo.freePaid')}>
            {isEditMode ? (
                <div className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center">
                    <FreeTierSelect
                        isFreeTier={isFreeTier ?? subscription.isFreeTier}
                        onChange={(value) => form.setValue('isFreeTier', value)}
                    />
                    {isFreeTier}
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    <IsFreeTierTagUI value={subscription.isFreeTier} />
                </div>
            )}
        </FormControl>
    );
});
