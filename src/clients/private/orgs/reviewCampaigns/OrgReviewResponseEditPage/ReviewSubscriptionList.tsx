import {UseFormReturn} from 'react-hook-form';
import {ReviewResponseSubscriptionDto, UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {CardSection} from './CardSection';
import {SubscriptionItemOfResponse} from './SubscriptionItemOfResponse';

interface ReviewSubscriptionListProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
    campaignSubscriptions: ReviewCampaignSubscriptionDto[];
}

export const ReviewSubscriptionList = (props: ReviewSubscriptionListProps) => {
    const {form, campaignSubscriptions} = props;

    const responseSubscriptionForms = form.watch('subscriptions') || [];

    return (
        <CardSection title="구독중인 서비스" required>
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
                        />
                    );
                })}
            </div>
        </CardSection>
    );
};
