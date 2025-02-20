'use client';

import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {CurrencyCode} from '^models/Money';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {UpdateSubscriptionSeatRequestDto} from '^models/SubscriptionSeat/type';
import {CardSection} from '^clients/private/_components/CardSection';
import {useCurrentSubscription} from '../../atom';
import {SubscriptionIsFreeTier} from './SubscriptionIsFreeTier';
import {SubscriptionBillingAmount} from './SubscriptionBillingAmount';
import {SubscriptionBillingCycleType} from './SubscriptionBillingCycleType';
import {SubscriptionPricingModel} from './SubscriptionPricingModel';
import {SubscriptionSeats} from './SubscriptionSeats';
import {SubscriptionCreditCard} from './SubscriptionCreditCard';
import {SubscriptionInvoiceAccount} from './SubscriptionInvoiceAccount';
import {SubscriptionStartAt} from './SubscriptionStartAt';
import {SubscriptionFinishAt} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionPaymentInfoSection/SubscriptionFinishAt';

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

    const onSubmit = async (dto: UpdateSubscriptionRequestDto) => {
        try {
            setIsSaving(true);
            await onUpdateSeats();
            await subscriptionApi.update(subscription.id, dto);
            console.log('invoiceAccountId', dto.invoiceAccountId);
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
                <SubscriptionStartAt isEditMode={isEditMode} form={form} />
                <SubscriptionFinishAt isEditMode={isEditMode} form={form} />
                <SubscriptionBillingAmount isEditMode={isEditMode} form={form} />
                <SubscriptionBillingCycleType isEditMode={isEditMode} form={form} />
                <SubscriptionPricingModel isEditMode={isEditMode} form={form} />
                <SubscriptionSeats isEditMode={isEditMode} handleSeats={handleSeats} />
                <SubscriptionCreditCard isEditMode={isEditMode} form={form} />
                <SubscriptionInvoiceAccount isEditMode={isEditMode} form={form} />
            </CardSection.Form>
        </CardSection.Base>
    );
});
