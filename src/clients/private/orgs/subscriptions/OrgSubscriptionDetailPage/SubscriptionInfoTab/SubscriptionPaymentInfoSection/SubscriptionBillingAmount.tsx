import React, {memo} from 'react';
import {UseFormReturn, useWatch} from 'react-hook-form';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {FreeTierSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/FreeTireSelect';
import {IsFreeTierTagUI} from '^models/Subscription/components';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useCurrentSubscription} from '../../atom';
import {
    CurrencySelect,
    InputSection,
    RecurringAmount,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {CurrencyCode} from '^models/Money';

interface SubscriptionBillingAmountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionBillingAmount = memo((props: SubscriptionBillingAmountProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="결제금액">
            {isEditMode ? (
                <InputSection className="max-w-lg !mb-0">
                    <div className="grid grid-cols-8 gap-2">
                        <div className="col-span-4">
                            <RecurringAmount
                                defaultValue={subscription.currentBillingAmount?.amount}
                                onChange={(amount) => form.setValue('currentBillingAmount.amount', amount)}
                            />
                        </div>
                        <div className="col-span-4">
                            <CurrencySelect
                                defaultValue={subscription.currentBillingAmount?.code}
                                onChange={(currency) =>
                                    form.setValue('currentBillingAmount.currency', currency as CurrencyCode)
                                }
                            />
                        </div>
                    </div>
                </InputSection>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    {subscription.currentBillingAmount?.to_s('%u %n')}
                </div>
            )}
            <span />
        </FormControl>
    );
});
