import {Card} from '^public/components/ui/card';
import {SubscriptionItemOfResponse} from './SubscriptionItemOfResponse';

interface ReviewSubscriptionListProps {
    subscriptions: any[];
}

export const ReviewSubscriptionList = ({subscriptions}: ReviewSubscriptionListProps) => (
    <Card className="bg-white px-7 py-6 space-y-5">
        <div className="text-16 font-medium">
            구독중인 서비스 <span className="text-red-400">*</span>
        </div>
        <div>
            {subscriptions.map((subscription, index) => (
                <SubscriptionItemOfResponse
                    key={index}
                    subscription={subscription}
                    onChange={(value) => {
                        console.log(value);
                    }}
                />
            ))}
        </div>
    </Card>
);
