'use client';

import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {BillingCycleOptions, SubscriptionBillingCycleTypeValues} from '^models/Subscription/types/BillingCycleOptions';
import {
    IsFreeTierColumn,
    PayingTypeSelect,
    PayingTypeTag,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {intlDateLong} from '^utils/dateTime';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {useRecoilState} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {IsFreeTierTagUI, PayMethodSelect} from '^models/Subscription/components';
import {toast} from 'react-hot-toast';
import {
    CurrencySelect,
    InputSection,
    PricingTypeSelect,
    RecurringAmount,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {OutLink} from '^components/OutLink';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {InvoiceAccountSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/InvoiceAccountSelect';

export const SubscriptionPaymentInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [subscription, setSubscription] = useRecoilState(subscriptionSubjectAtom);

    if (!subscription) return null;

    const onSubmit = (dto: UpdateSubscriptionRequestDto) => {
        subscriptionApi.update(subscription?.id, dto).then((res) => {
            setSubscription(res.data);
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
        });
    };

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">결제 정보</h2>

                            <FormControl label="유무료여부">
                                {isEditMode ? (
                                    <IsFreeTierColumn
                                        subscription={subscription}
                                        onChange={(value) => form.setValue('isFreeTier', value)}
                                    />
                                ) : (
                                    <div className="flex items-center gap-1" style={{height: '49.5px'}}>
                                        <IsFreeTierTagUI value={subscription?.isFreeTier} />
                                    </div>
                                )}
                            </FormControl>

                            <FormControl label="구독시작일">
                                {isEditMode ? (
                                    <Datepicker
                                        inputClassName="input input-underline !bg-slate-100 w-full"
                                        asSingle={true}
                                        value={{
                                            startDate: form.getValues('startAt') || null,
                                            endDate: form.getValues('startAt') || null,
                                        }}
                                        onChange={
                                            (newValue) => form.setValue('startAt', newValue?.startDate)
                                            // form.setValue('registeredAt', newValue.startDate.toDateString())
                                        }
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.startAt ? intlDateLong(subscription?.startAt) : '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="구독종료일">
                                {isEditMode ? (
                                    <Datepicker
                                        inputClassName="input input-underline !bg-slate-100 w-full"
                                        asSingle={true}
                                        value={{
                                            startDate: form.getValues('finishAt') || null,
                                            endDate: form.getValues('finishAt') || null,
                                        }}
                                        onChange={(newValue) => form.setValue('finishAt', newValue?.startDate)}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.finishAt ? intlDateLong(subscription?.finishAt) : '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="요금제">
                                {isEditMode ? (
                                    <InputSection className="max-w-lg">
                                        {/* TODO 여기 컴포넌트들 수정해도 되는지 확인 필요 */}
                                        <div className="grid grid-cols-8 gap-2">
                                            <div className="col-span-3">
                                                <PricingTypeSelect />
                                            </div>
                                            <div className="col-span-3">
                                                <RecurringAmount />
                                            </div>
                                            <div className="col-span-2">
                                                <CurrencySelect />
                                            </div>
                                        </div>

                                        {/*{subscription.product.pricingPageUrl && (*/}
                                        {/*    <div>*/}
                                        {/*        <OutLink*/}
                                        {/*            text="사이트에서 내 플랜 확인하기"*/}
                                        {/*            href={subscription.product.pricingPageUrl}*/}
                                        {/*            className="text-14"*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
                                    </InputSection>
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.currentBillingAmount?.symbol}
                                        {subscription?.currentBillingAmount?.amount.toLocaleString()} /{' '}
                                        {subscription?.billingCycleType === BillingCycleOptions.Monthly ? '월' : '년'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="결제주기">
                                {isEditMode ? (
                                    <SelectColumn
                                        value={subscription.billingCycleType}
                                        getOptions={async () => SubscriptionBillingCycleTypeValues}
                                        onSelect={(option) => Promise.resolve()}
                                        ValueComponent={BillingCycleTypeTagUI}
                                        contentMinWidth="240px"
                                        optionListBoxTitle="결제주기를 수정합니다"
                                        inputDisplay={false}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        <BillingCycleTypeTagUI value={subscription.billingCycleType} />
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="과금방식">
                                {isEditMode ? (
                                    <PayingTypeSelect
                                        defaultValue={subscription.pricingModel}
                                        subscription={subscription}
                                        onChange={(value) => form.setValue('pricingModel', value)}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        <PayingTypeTag value={subscription.pricingModel} />
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="구매수량">
                                {isEditMode ? (
                                    // TODO 이거 어떻게 구현하지?
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        defaultValue={subscription?.usedMemberCount}
                                        // onChange={(e) => form.setValue('usedMemberCount', e.target.value)}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription.usedMemberCount}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="결제수단">
                                {isEditMode ? (
                                    <PayMethodSelect
                                        subscription={subscription}
                                        onChange={(creditCard) => form.setValue('creditCardId', creditCard?.id)}
                                        ValueComponent={(props) => {
                                            const {value} = props;
                                            return typeof value === 'string' ? (
                                                <p>{value}</p>
                                            ) : (
                                                <CreditCardProfileCompact item={value} />
                                            );
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        <CreditCardProfileCompact item={subscription.creditCard} />
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="청구이메일">
                                {isEditMode ? (
                                    // TODO 이메일 업데이트
                                    <InvoiceAccountSelect />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription.invoiceAccounts?.map((invoiceAccount, index) => (
                                            <InvoiceAccountProfile key={index} invoiceAccount={invoiceAccount} />
                                        ))}
                                    </div>
                                )}
                                <span />
                            </FormControl>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
});
