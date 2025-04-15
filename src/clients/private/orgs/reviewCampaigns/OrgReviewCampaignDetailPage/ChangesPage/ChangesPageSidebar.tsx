import {memo} from 'react';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';

interface ChangesPageSidebarProps {
    reviewCampaign?: ReviewCampaignDto;
}

export const ChangesPageSidebar = memo((props: ChangesPageSidebarProps) => {
    const {reviewCampaign} = props;

    return (
        <div className="w-[240px]">
            <div className="space-y-2 text-sm">
                {reviewCampaign?.subscriptions?.map((sub) => {
                    const subscriptionNamePart = sub.subscriptionName ? ` - ${sub.subscriptionName}` : '';
                    return (
                        <div
                            key={sub.subscriptionId}
                            className="flex items-center space-x-2 rounded-md hover:bg-gray-200 px-2 py-1.5"
                        >
                            <span className="font-medium text-gray-700">
                                {sub.productName}
                                {subscriptionNamePart}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
ChangesPageSidebar.displayName = 'ChangesPageSidebar';
