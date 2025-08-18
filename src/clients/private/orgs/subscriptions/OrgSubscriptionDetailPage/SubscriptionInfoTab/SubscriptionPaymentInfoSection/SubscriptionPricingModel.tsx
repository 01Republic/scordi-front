import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {
    PayingTypeSelect,
    PayingTypeTag,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';

interface SubscriptionPricingModelProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionPricingModel = memo((props: SubscriptionPricingModelProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, subscription} = props;

    return (
        <FormControl label={t('detail.paymentInfo.pricingModel')}>
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
