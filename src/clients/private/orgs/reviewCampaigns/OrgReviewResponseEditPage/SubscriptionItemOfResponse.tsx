import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type/ReviewCampaignSubscription.dto';
import {
    ReviewResponseSubscriptionUsingStatus,
    t_reviewResponseSubscriptionUsingStatus,
} from '^models/ReviewResponse/type';
import {UpdateReviewResponseSubscriptionRequestDto} from '^models/ReviewResponse/type/UpdateReviewResponseSubscriptionRequest.dto';
import {Tabs, TabsList, TabsTrigger} from '^public/components/ui/tabs';
import {HelpCircle} from 'lucide-react';
import Image from 'next/image';
import {memo} from 'react';

interface SubscriptionItemOfResponseProps {
    responseSubscription: UpdateReviewResponseSubscriptionRequestDto;
    campaignSubscription: ReviewCampaignSubscriptionDto;
    onChange: (value: ReviewResponseSubscriptionUsingStatus) => void;
}

export const SubscriptionItemOfResponse = memo((props: SubscriptionItemOfResponseProps) => {
    const {responseSubscription, campaignSubscription, onChange} = props;
    const {productName, productImage} = campaignSubscription;

    const handleTabChange = (value: ReviewResponseSubscriptionUsingStatus) => {
        onChange(value);
    };

    return (
        <div className="grid sm:grid-cols-2 gap-y-4 items-center py-4 border-b last:border-0">
            <div className="flex items-center gap-2" onClick={() => console.log(responseSubscription)}>
                <div className="w-[24px] h-[24px]">
                    {productImage ? (
                        <Image
                            src={productImage}
                            alt={productName}
                            width={24}
                            height={24}
                            loading="lazy"
                            draggable={false}
                            className={`rounded-full`}
                        />
                    ) : (
                        <div className={`flex items-center bg-gray-100 rounded-full `} style={{width: 24, height: 24}}>
                            <HelpCircle className="text-gray-300 h-full w-full p-1" />
                        </div>
                    )}
                </div>

                <div className="overflow-hidden text-ellipsis max-w-[200px]">{productName}</div>
            </div>

            <div className="flex items-center justify-stretch sm:justify-end">
                <Tabs
                    className="w-full sm:w-[initial]"
                    defaultValue={responseSubscription.usingStatus || ReviewResponseSubscriptionUsingStatus.NO_USE}
                >
                    <TabsList className="grid grid-cols-3 bg-gray-100 border border-gray-200 w-full">
                        {[
                            ReviewResponseSubscriptionUsingStatus.IN_USE,
                            ReviewResponseSubscriptionUsingStatus.NO_USE,
                            ReviewResponseSubscriptionUsingStatus.DONT_KNOW,
                        ].map((value, i) => (
                            <TabsTrigger
                                key={i}
                                value={value}
                                className={`min-w-20 data-[state=active]:bg-[#5C5FEE] data-[state=active]:text-white`}
                                onClick={() => handleTabChange(value)}
                            >
                                {t_reviewResponseSubscriptionUsingStatus(value)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
});
