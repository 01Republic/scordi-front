import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {CurrencyCode} from '^models/Money';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {BillingCycleTypeTagUI, IsFreeTierTagUI} from '^models/Subscription/components';
import {
    PayingTypeSelect,
    PayingTypeTag,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {
    CurrencySelect,
    InputSection,
    RecurringAmount,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {t_SubscriptionBillingCycleTiny} from '^models/Subscription/types/BillingCycleOptions';
import {FreeTierSelect} from './FreeTireSelect';
import {DatepickerField} from './DatePickerField';
import {BillingCycleSelect} from './BillingCycleTypeSelect';

interface SubscriptionFormFieldsProps {
    form: any;
    subscription: SubscriptionDto;
    isEditMode: boolean;
    afterHandleSeats: (value: number) => void;
    prevSeats: UpdateSubscriptionSeatRequestDto[];
}

export const SubscriptionFormFields = memo(function SubscriptionFormFields(props: SubscriptionFormFieldsProps) {
    const {form, subscription, isEditMode, afterHandleSeats, prevSeats} = props;
    const prevSeatCount = subscription.subscriptionSeats?.length || 0;
    const seatWithTeamMemberCount = prevSeats.filter((seat) => seat.teamMemberId).length;

    const handleSeats = (value: number) => {
        if (value < seatWithTeamMemberCount) {
            toast.error('구매수량이 멤버 수보다 적을 수 없어요.');
            afterHandleSeats(0);
        } else {
            afterHandleSeats(value - prevSeatCount);
        }
    };

    return (
        <div className="px-8 py-8 border-b">
            <div className="max-w-md flex flex-col gap-4">
                <h2 className="leading-none text-xl font-semibold pb-4">결제 정보</h2>

                <FormControl label="유무료여부">
                    {isEditMode ? (
                        <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                            <FreeTierSelect
                                isFreeTier={form.watch('isFreeTier') ?? subscription.isFreeTier}
                                onChange={(value) => form.setValue('isFreeTier', value)}
                            />
                            {form.watch('isFreeTier')}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 min-h-12">
                            <IsFreeTierTagUI value={subscription?.isFreeTier} />
                        </div>
                    )}
                </FormControl>

                <DatepickerField
                    label="구독시작일"
                    isEditMode={isEditMode}
                    form={form}
                    field="startAt"
                    subscription={subscription}
                />

                <DatepickerField
                    label="구독종료일"
                    isEditMode={isEditMode}
                    form={form}
                    field="finishAt"
                    subscription={subscription}
                />

                <FormControl label="요금제">
                    {isEditMode ? (
                        <div className={'mb-[-40px]'}>
                            <InputSection className="max-w-lg">
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
                        </div>
                    ) : (
                        <div className="flex items-center min-h-12">
                            {subscription?.currentBillingAmount?.symbol}
                            {subscription?.currentBillingAmount?.amount.toLocaleString()} /{' '}
                            {t_SubscriptionBillingCycleTiny(subscription.billingCycleType)}
                        </div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="결제주기">
                    {isEditMode ? (
                        <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                            <BillingCycleSelect
                                billingCycle={form.watch('billingCycleType') || subscription.billingCycleType}
                                onChange={(value) => form.setValue('billingCycleType', value)}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center min-h-12">
                            <BillingCycleTypeTagUI value={subscription.billingCycleType} />
                        </div>
                    )}
                    <span />
                </FormControl>

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
                        <div className="flex items-center min-h-12">
                            <PayingTypeTag value={subscription.pricingModel} />
                        </div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="구매수량">
                    {isEditMode ? (
                        <input
                            className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                            type={'number'}
                            defaultValue={prevSeatCount}
                            min={seatWithTeamMemberCount}
                            onChange={(e) => handleSeats(Number(e.target.value))}
                        />
                    ) : (
                        <div className="flex items-center min-h-12">{prevSeatCount}</div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="결제수단">
                    <div className="flex items-center min-h-12">
                        {subscription.creditCard ? (
                            <CreditCardProfileCompact item={subscription.creditCard} />
                        ) : (
                            <i className="text-gray-400">미설정</i>
                        )}
                    </div>
                    <span />
                </FormControl>

                <FormControl label="청구이메일">
                    <div className="flex flex-col justify-center gap-2 min-h-12">
                        {subscription.invoiceAccounts?.length === 0 && <i className="text-gray-400">미설정</i>}
                        {subscription.invoiceAccounts?.map((invoiceAccount, index) => (
                            <InvoiceAccountProfileCompact key={index} invoiceAccount={invoiceAccount} />
                        ))}
                    </div>
                    <span />
                </FormControl>
            </div>
        </div>
    );
});
