'use client';

import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';
import {dateIsBeforeThen, intlDateLong, yyyy_mm_dd} from '^utils/dateTime';
import Tippy from '@tippyjs/react';
import {CurrencyCode} from '^models/Money';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {CreditCardProfileCompact, CreditCardSelect} from '^models/CreditCard/components';
import {InvoiceAccountProfileCompact, InvoiceAccountSelect} from '^models/InvoiceAccount/components';
import {CardSection} from '^clients/private/_components/CardSection';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useCurrentSubscription} from '../../atom';
import {EmptyValue} from '../../EmptyValue';
import {SubscriptionIsFreeTier} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/SubscriptionIsFreeTier';
import {SubscriptionBillingAmount} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/SubscriptionBillingAmount';
import {SubscriptionBillingCycleType} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/SubscriptionBillingCycleType';
import {SubscriptionPricingModel} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/SubscriptionPricingModel';

export const SubscriptionPaymentInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {reload, currentSubscription: subscription} = useCurrentSubscription();
    const [prevSeats, setPrevSeats] = useState<UpdateSubscriptionSeatRequestDto[]>([]);
    const [updateSeatCount, setUpdateSeatCount] = useState<number>(0);

    if (!subscription) return <></>;

    const prevSeatCount = subscription.subscriptionSeats?.length || 0;
    const seatWithTeamMemberCount = prevSeats.filter((seat) => seat.teamMemberId).length;
    const finishAt = form.watch('finishAt');
    const startAt = form.watch('startAt');

    const onSubmit = async (dto: UpdateSubscriptionRequestDto) => {
        try {
            setIsSaving(true);
            await onUpdateSeats();
            await subscriptionApi.update(subscription.id, dto);
            await reload();
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
        } catch (error) {
            console.error('Error during submission:', error);
            toast.error('변경사항 저장 중 오류가 발생했어요.');
        } finally {
            setIsSaving(false);
        }
    };

    const onUpdateSeats = async () => {
        try {
            if (updateSeatCount < 0) {
                await destroySeats(updateSeatCount);
            }
            if (updateSeatCount > 0) {
                await createSeats(updateSeatCount);
            }
        } catch (error) {
            console.error('Error updating seats:', error);
        }
    };

    const destroySeats = async (count: number) => {
        const seatsToRemove = (subscription.subscriptionSeats || [])
            .filter((seat) => !seat.teamMemberId)
            .slice(0, Math.abs(count));
        await Promise.allSettled(
            seatsToRemove.map((seat) =>
                subscriptionApi.seatsApi.destroy(subscription.organizationId, subscription.id, seat.id),
            ),
        );
    };

    const createSeats = async (count: number) => {
        const {id, organizationId} = subscription;
        await Promise.allSettled(
            Array.from({length: count}).map(() =>
                subscriptionApi.seatsApi.create(organizationId, id, {subscriptionId: id}),
            ),
        );
    };

    const handleSeats = (value: number) => {
        if (value < seatWithTeamMemberCount) {
            toast.error('구매수량이 멤버 수보다 적을 수 없어요.');
            setUpdateSeatCount(0);
        } else {
            setUpdateSeatCount(value - prevSeatCount);
        }
    };

    useEffect(() => {
        form.setValue('currentBillingAmount.amount', subscription?.currentBillingAmount?.amount || 0);
        form.setValue('currentBillingAmount.currency', subscription?.currentBillingAmount?.code || CurrencyCode.KRW);
        if (subscription) {
            form.setValue('startAt', subscription.startAt);
            form.setValue('finishAt', subscription.finishAt);
        }

        const seats: UpdateSubscriptionSeatRequestDto[] =
            subscription.subscriptionSeats?.map((seat) => ({
                subscriptionId: subscription.id,
                teamMemberId: seat.teamMemberId || undefined,
            })) || [];

        setPrevSeats(seats);
    }, [subscription]);

    form.watch();

    return (
        <CardSection.Base>
            <CardSection.Form
                title="결제 정보"
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                onSubmit={form.handleSubmit(onSubmit)}
                isSaving={isSaving}
            >
                <SubscriptionIsFreeTier isEditMode={isEditMode} form={form} />

                <FormControl label="구독시작일">
                    {isEditMode ? (
                        <Datepicker
                            inputClassName="input border-gray-200 bg-gray-100 w-full"
                            asSingle={true}
                            useRange={false}
                            value={{
                                startDate: form.watch('startAt') || null,
                                endDate: form.watch('startAt') || null,
                            }}
                            onChange={(newValue) => {
                                const startAt = newValue?.startDate;
                                if (startAt) {
                                    const finishAt = form.watch('finishAt');
                                    if (finishAt && !dateIsBeforeThen(startAt, finishAt)) {
                                        toast('종료일보다는 작아야 합니다.');
                                        form.setValue('startAt', form.watch('startAt'));
                                    } else {
                                        form.setValue('startAt', new Date(yyyy_mm_dd(startAt)));
                                    }
                                } else {
                                    form.setValue('startAt', null);
                                    form.setValue('finishAt', null);
                                }
                            }}
                        />
                    ) : (
                        <div className="flex items-center" style={{height: '49.5px'}}>
                            {subscription?.startAt ? intlDateLong(subscription?.startAt) : <EmptyValue />}
                        </div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="구독종료일">
                    {isEditMode ? (
                        <>
                            {startAt ? (
                                <Datepicker
                                    inputClassName="input border-gray-200 bg-gray-100 w-full"
                                    asSingle={true}
                                    useRange={false}
                                    value={{
                                        startDate: finishAt || null,
                                        endDate: finishAt || null,
                                    }}
                                    onChange={(newValue) => {
                                        const finishAt = newValue?.startDate;
                                        if (finishAt) {
                                            if (startAt && !dateIsBeforeThen(startAt, finishAt)) {
                                                toast('시작일보다는 커야 합니다.');
                                                form.setValue('finishAt', form.watch('finishAt'));
                                            } else {
                                                form.setValue('finishAt', new Date(yyyy_mm_dd(finishAt)));
                                            }
                                        } else {
                                            form.setValue('finishAt', null);
                                        }
                                    }}
                                />
                            ) : (
                                <div onClick={() => toast('시작일을 먼저 설정해주세요.')}>
                                    <input
                                        className="input border-gray-200 bg-gray-100 w-full cursor-pointer"
                                        placeholder="YYYY-MM-DD"
                                        readOnly
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center" style={{height: '49.5px'}}>
                            {subscription?.finishAt ? intlDateLong(subscription?.finishAt) : <EmptyValue />}
                        </div>
                    )}
                </FormControl>
                <SubscriptionBillingAmount isEditMode={isEditMode} form={form} />
                <SubscriptionBillingCycleType isEditMode={isEditMode} form={form} />
                <SubscriptionPricingModel isEditMode={isEditMode} form={form} />

                <FormControl label="구매수량">
                    {isEditMode ? (
                        <div className="relative">
                            <input
                                className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                                defaultValue={prevSeatCount}
                                min={prevSeatCount}
                                type="number"
                                onChange={(e) => {
                                    const value = Number(e.target.value.toString().replace(/\D/g, ''));
                                    e.target.value = value.toString();
                                    if (value) handleSeats(value);
                                }}
                            />
                            <div className="flex items-center absolute right-2 top-0 bottom-0 text-12 text-gray-500">
                                현재 보유: {prevSeatCount.toLocaleString()}개
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                            {prevSeatCount}
                        </div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="결제수단">
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
                            {/*{subscription.creditCard?.length === 0 && (*/}
                            {/*    <i className="text-gray-400">미설정</i>*/}
                            {/*)}*/}
                            <CreditCardProfileCompact item={subscription.creditCard} />
                        </div>
                    )}
                    <span />
                </FormControl>

                <FormControl label="청구서메일">
                    {isEditMode ? (
                        <div className={'mb-[-40px]'}>
                            <InvoiceAccountSelect
                                defaultValue={subscription.invoiceAccounts?.[0]}
                                onSelect={(invoiceAccount) => {
                                    form.setValue('invoiceAccountId', invoiceAccount?.id);
                                }}
                                placeholder={<EmptyValue />}
                                getLabel={(option) => <InvoiceAccountProfileCompact invoiceAccount={option} />}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                            {!!subscription.invoiceAccounts?.length ? (
                                <>
                                    <InvoiceAccountProfileCompact
                                        invoiceAccount={(subscription.invoiceAccounts || [])[0]}
                                    />
                                    {!!(subscription.invoiceAccounts?.length - 1) && (
                                        <Tippy
                                            content={
                                                <span
                                                    className="text-12"
                                                    dangerouslySetInnerHTML={{
                                                        __html: subscription.invoiceAccounts
                                                            .map((item) => item.email)
                                                            .join('<br />'),
                                                    }}
                                                />
                                            }
                                        >
                                            <div className="text-gray-500 text-13 cursor-pointer">
                                                외 {subscription.invoiceAccounts?.length - 1}개
                                            </div>
                                        </Tippy>
                                    )}
                                </>
                            ) : (
                                <EmptyValue />
                            )}
                        </div>
                    )}
                    <span />
                </FormControl>
            </CardSection.Form>
        </CardSection.Base>
    );
});
