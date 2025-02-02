'use client';

import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import {CurrencyCode} from '^models/Money';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {useCurrentSubscription} from '../../atom';
import {SubscriptionFormFields} from './SubscriptionFormFields';

export const SubscriptionPaymentInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const {reload, currentSubscription: subscription} = useCurrentSubscription();
    const [prevSeats, setPrevSeats] = useState<UpdateSubscriptionSeatRequestDto[]>([]);
    const [updateSeatCount, setUpdateSeatCount] = useState<number>(0);

    if (!subscription) return <></>;

    const onSubmit = async (dto: UpdateSubscriptionRequestDto) => {
        try {
            await onUpdateSeats();
            await subscriptionApi.update(subscription?.id, dto);
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
            reload();
        } catch (error) {
            console.error('Error during submission:', error);
            toast.error('변경사항 저장 중 오류가 발생했어요.');
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
        await Promise.allSettled(
            Array.from({length: count}).map(() =>
                subscriptionApi.seatsApi.create(subscription.organizationId, subscription.id, {
                    subscriptionId: subscription.id,
                }),
            ),
        );
    };

    const afterHandleSeats = (value: number) => {
        setUpdateSeatCount(value);
    };

    useEffect(() => {
        form.setValue('currentBillingAmount.amount', subscription?.currentBillingAmount?.amount || 0);
        form.setValue('currentBillingAmount.currency', subscription?.currentBillingAmount?.code || CurrencyCode.KRW);

        const seats: UpdateSubscriptionSeatRequestDto[] =
            subscription.subscriptionSeats?.map((seat) => ({
                subscriptionId: subscription.id,
                teamMemberId: seat.teamMemberId || undefined,
            })) || [];

        setPrevSeats(seats);
    }, [subscription]);

    form.watch();

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

                    <SubscriptionFormFields
                        form={form}
                        subscription={subscription}
                        isEditMode={isEditMode}
                        afterHandleSeats={afterHandleSeats}
                        prevSeats={prevSeats}
                    />
                </form>
            </div>
        </section>
    );
});
