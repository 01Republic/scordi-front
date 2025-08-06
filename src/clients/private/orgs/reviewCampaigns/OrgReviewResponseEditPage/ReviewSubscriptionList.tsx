import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {useTranslation} from 'next-i18next';
import {UseFormReturn} from 'react-hook-form';
import {CardSection} from './CardSection';
import {SubscriptionItemOfResponse} from './SubscriptionItemOfResponse';

interface ReviewSubscriptionListProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
    campaignSubscriptions: ReviewCampaignSubscriptionDto[];
    readonly?: boolean;
}

export const ReviewSubscriptionList = (props: ReviewSubscriptionListProps) => {
    const {form, campaignSubscriptions, readonly = false} = props;
    const {t} = useTranslation('reviewCampaigns');

    const responseSubscriptionForms = form.watch('subscriptions') || [];

    return (
        <CardSection title={t('subscription.title')} required>
            <div>
                {responseSubscriptionForms.map((responseSubscriptionForm, i) => {
                    const {subscriptionId} = responseSubscriptionForm;
                    const campaignSubscription = campaignSubscriptions.find((s) => s.subscriptionId === subscriptionId);

                    if (!campaignSubscription) return <></>;

                    return (
                        <SubscriptionItemOfResponse
                            key={i}
                            responseSubscription={responseSubscriptionForm}
                            campaignSubscription={campaignSubscription}
                            onChange={(usingStatus) => {
                                const subscriptions = form.getValues('subscriptions') || [];
                                const newSubs = subscriptions.map((sub) => {
                                    if (sub.subscriptionId != responseSubscriptionForm.subscriptionId) return sub;
                                    console.log({...sub, usingStatus});
                                    return {...sub, usingStatus};
                                });
                                form.setValue('subscriptions', newSubs);
                            }}
                            readonly={readonly}
                        />
                    );
                })}
            </div>
        </CardSection>
    );
};
