'use client';

import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {CurrencyCode} from '^models/Money';
import {subscriptionApi} from '^models/Subscription/api';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
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
import {SubscriptionFinishAt} from './SubscriptionFinishAt';
import {SubscriptionBankAccount} from './SubscriptionBankAccount';
import {useShowSubscription} from '^models/Subscription/hook';
import {useCreateSubscriptionSeat, useDestroyAllSubscriptionSeat} from '^models/SubscriptionSeat/hook';

export const SubscriptionPaymentInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {currentSubscription, reload} = useCurrentSubscription();
    const [updateSeatCount, setUpdateSeatCount] = useState<number>(0);

    if (!currentSubscription) return null;

    const {data: subscription, refetch} = useShowSubscription(currentSubscription.id, {
        relations: ['invoiceAccounts', 'subscriptionSeats'],
    });
    const {mutateAsync: creatSubscriptionSeat} = useCreateSubscriptionSeat();
    const {mutateAsync: destroyAllSubscriptionSeat} = useDestroyAllSubscriptionSeat();

    useEffect(() => {
        if (!subscription) return;
        form.setValue('currentBillingAmount.amount', subscription.currentBillingAmount?.amount || 0);
        form.setValue('currentBillingAmount.currency', subscription.currentBillingAmount?.code || CurrencyCode.KRW);
        form.setValue('startAt', subscription.startAt);
        form.setValue('finishAt', subscription.finishAt);
    }, [subscription]);

    if (!subscription) return <></>;

    const removeInvoiceAccount = () => {
        if (!subscription.invoiceAccounts) return;
        const defaultInvoiceAccountIds = subscription.invoiceAccounts.map((invoiceAccount) => invoiceAccount.id);
        const selectAccountIds = form.getValues('invoiceAccountIdsForMulti') || [];
        const removedIds = defaultInvoiceAccountIds.filter((id) => !selectAccountIds.includes(id));
        const addedIds = selectAccountIds.filter((id) => !defaultInvoiceAccountIds.includes(id));

        return {removedIds, addedIds};
    };

    const currentSeatCount = subscription.subscriptionSeats?.length || 0;
    const currentAssignedSeatCount = subscription.subscriptionSeats?.filter((seat) => seat.teamMemberId).length || 0;

    const onSubmit = async (dto: UpdateSubscriptionRequestDto) => {
        try {
            setIsSaving(true);
            const {id, organizationId} = subscription;

            if (updateSeatCount > 0) {
                if (updateSeatCount < currentAssignedSeatCount) {
                    toast.error('구매 수량은 할당된 멤버 수 이상이어야 합니다.');
                    return;
                }

                const changeCount = updateSeatCount - currentSeatCount;

                if (changeCount < 0) {
                    const toRemoveCount = Math.abs(changeCount);
                    const seatsToRemove = (subscription.subscriptionSeats || [])
                        .filter((seat) => seat.teamMemberId == null)
                        .slice(0, toRemoveCount)
                        .map((seat) => seat.id);

                    await destroyAllSubscriptionSeat({orgId: organizationId, subscriptionId: id, ids: seatsToRemove});
                } else if (changeCount > 0) {
                    await Promise.all(
                        Array.from({length: changeCount}).map(() =>
                            creatSubscriptionSeat({
                                orgId: organizationId,
                                subscriptionId: id,
                                dto: {subscriptionId: id},
                            }),
                        ),
                    );
                }

                const removedIds = removeInvoiceAccount()?.removedIds;
                const addedIds = removeInvoiceAccount()?.addedIds;

                if (removedIds?.length) {
                    await Promise.all(
                        removedIds.map((invoiceAccountId) =>
                            invoiceAccountApi.subscriptionsApi.destroy(invoiceAccountId, id),
                        ),
                    );
                }

                if (addedIds?.length) {
                    await Promise.all(
                        addedIds.map((invoiceAccountId) =>
                            invoiceAccountApi.subscriptionsApi.create(invoiceAccountId, id),
                        ),
                    );
                }
            }

            const {invoiceAccountIdsForMulti, ...dtoWithoutInvoiceAccountIdsForMulti} = dto;
            await subscriptionApi.update(subscription.id, dtoWithoutInvoiceAccountIdsForMulti);
            await reload();
            refetch();
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
        } catch (error) {
            toast.error('변경사항 저장 중 오류가 발생했어요.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <CardSection.Base>
            <CardSection.Form
                title="결제 정보"
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                onSubmit={form.handleSubmit(onSubmit)}
                isSaving={isSaving}
            >
                <SubscriptionIsFreeTier isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionStartAt isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionFinishAt isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionBillingAmount isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionBillingCycleType isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionPricingModel isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionSeats
                    isEditMode={isEditMode}
                    setUpdateSeatCount={setUpdateSeatCount}
                    currentSeatCount={currentSeatCount}
                    currentAssignedSeatCount={currentAssignedSeatCount}
                />
                <SubscriptionCreditCard isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionBankAccount isEditMode={isEditMode} form={form} subscription={subscription} />
                <SubscriptionInvoiceAccount isEditMode={isEditMode} form={form} subscription={subscription} />
            </CardSection.Form>
        </CardSection.Base>
    );
});
