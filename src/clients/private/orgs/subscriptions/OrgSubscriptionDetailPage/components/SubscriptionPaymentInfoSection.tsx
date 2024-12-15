'use client';

import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SelectTeam} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/SelectTeam';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import {BillingCycleTypeTagUI} from '^models/Subscription/components/BillingCycleTypeTagUI';
import {
    BillingCycleOptions,
    SubscriptionBillingCycleTypeValues,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {
    PayingType,
    PayingTypeSelect,
    PayingTypeTag,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {PricingModelOptions, t_SubscriptionPricingModel} from '^models/Subscription/types/PricingModelOptions';
import {intlDateLong} from '^utils/dateTime';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {useRecoilState} from 'recoil';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {PayMethodSelect} from '^models/Subscription/components';

export const SubscriptionPaymentInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [subscription, setSubscription] = useRecoilState(subscriptionSubjectAtom);

    if (!subscription) return null;

    console.log(form.watch());

    const onSubmit = (dto: UpdateSubscriptionRequestDto) => {
        subscriptionApi.update(subscription?.id, dto).then((res) => {
            setSubscription(res.data);
            console.log('변경사항을 저장했어요.');
            setIsEditMode(false);
        });
    };

    const creditCardName = subscription?.creditCard?.issuerCompany
        ?.replace('카드', '')
        .replace('card', '')
        .toUpperCase();

    const endNumber = subscription?.creditCard?.secretInfo?.number4;

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
                                    <select
                                        className="select select-underline input-underline !bg-slate-100 w-full"
                                        onChange={(e) => {
                                            form.setValue('isFreeTier', e.target.value === '무료');
                                        }}
                                        defaultValue={subscription?.isFreeTier ? '무료' : '유료'}
                                    >
                                        <option value={'무료'}>무료</option>
                                        <option value={'유료'}>유료</option>
                                    </select>
                                ) : (
                                    <div className="flex items-center gap-1" style={{height: '49.5px'}}>
                                        {subscription?.isFreeTier ? '무료' : '유료'}
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
                                    <input className="input input-underline !bg-slate-100 w-full" />
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
                                        {t_SubscriptionBillingCycleType(subscription?.billingCycleType, true)}
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
                                        {t_SubscriptionPricingModel(subscription?.pricingModel)}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="결제수단">
                                {isEditMode ? (
                                    <PayMethodSelect
                                        subscription={subscription}
                                        onChange={() => console.log(subscription)}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {creditCardName}({endNumber})
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="청구이메일">
                                {isEditMode ? (
                                    <input className="input input-underline !bg-slate-100 w-full" />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {/* TODO 청구이메일 정보 없음 */}
                                        {subscription?.master?.email || '-'}
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
