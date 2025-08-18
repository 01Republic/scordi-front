'use client';

import {CardSection} from '^clients/private/_components/CardSection';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {CurrencyCode} from '^models/Money';
import {subscriptionApi} from '^models/Subscription/api';
import {useShowSubscription} from '^models/Subscription/hook';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useCreateSubscriptionSeat, useDestroyAllSubscriptionSeat} from '^models/SubscriptionSeat/hook';
import {useTranslation} from 'next-i18next';
import {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useCurrentSubscription} from '../../atom';
import {SubscriptionBankAccount} from './SubscriptionBankAccount';
import {SubscriptionBillingAmount} from './SubscriptionBillingAmount';
import {SubscriptionBillingCycleType} from './SubscriptionBillingCycleType';
import {SubscriptionCreditCard} from './SubscriptionCreditCard';
import {SubscriptionFinishAt} from './SubscriptionFinishAt';
import {SubscriptionInvoiceAccount} from './SubscriptionInvoiceAccount';
import {SubscriptionIsFreeTier} from './SubscriptionIsFreeTier';
import {SubscriptionPricingModel} from './SubscriptionPricingModel';
import {SubscriptionSeats} from './SubscriptionSeats';
import {SubscriptionStartAt} from './SubscriptionStartAt';

export const SubscriptionPaymentInfoSection = memo(() => {
    const {t} = useTranslation('subscription');
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
                    toast.error(t('detail.paymentInfo.quantityError'));
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
            toast.success(t('toast.saveSuccess'));
            setIsEditMode(false);
        } catch (error) {
            toast.error(t('toast.saveError'));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <CardSection.Base>
            <CardSection.Form
                title={t('detail.paymentInfo.title')}
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
