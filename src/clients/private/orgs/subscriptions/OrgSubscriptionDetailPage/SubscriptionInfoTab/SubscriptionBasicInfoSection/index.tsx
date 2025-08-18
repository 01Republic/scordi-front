import {errorToast} from '^api/api';
import {CardSection} from '^clients/private/_components/CardSection';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useShowSubscription, useUpdateSubscription} from '^models/Subscription/hook';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {SubscriptionAlias} from './SubscriptionAlias';
import {SubscriptionDesc} from './SubscriptionDesc';
import {SubscriptionMaster} from './SubscriptionMaster';
import {SubscriptionTeam} from './SubscriptionTeam';

export const SubscriptionBasicInfoSection = memo(() => {
    const {reload, currentSubscription} = useCurrentSubscription();
    const {data} = useShowSubscription(currentSubscription?.id, {
        relations: ['invoiceAccounts.googleTokenData'],
    });
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {t} = useTranslation('subscription');

    if (!currentSubscription) return <></>;

    const {mutateAsync: updateSubscription} = useUpdateSubscription();

    const onSubmit = (dto: UpdateSubscriptionRequestDto) => {
        if (!currentSubscription) return;
        updateSubscription({subscriptionId: currentSubscription.id, data: dto})
            .then(() => setIsSaving(true))
            .then(() => toast.success(t('update.success')))
            .then(() => setIsEditMode(false))
            .catch(errorToast)
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <CardSection.Base>
            <CardSection.Form
                title={t('detail.infoTab.basicInfo.title')}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                onSubmit={form.handleSubmit(onSubmit)}
                isSaving={isSaving}
            >
                <SubscriptionAlias isEditMode={isEditMode} form={form} defaultValue={data?.alias} />
                <SubscriptionMaster isEditMode={isEditMode} form={form} defaultValue={data?.master} />
                <SubscriptionDesc isEditMode={isEditMode} form={form} defaultValue={data?.desc} />
                <SubscriptionTeam />
            </CardSection.Form>
        </CardSection.Base>
    );
});
