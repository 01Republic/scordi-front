import {memo, useState} from 'react';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {OrgReviewCampaignDetailLayout} from '../layout';
import {ChangesPageSidebar} from './ChangesPageSidebar';
import {ChangesPageMainContent} from './ChangesPageMainContent';

export const OrgReviewCampaignDetailChangesPage = memo(() => {
    const [selectedCampaignSub, setSelectedCampaignSub] = useState<ReviewCampaignSubscriptionDto>();

    return (
        <OrgReviewCampaignDetailLayout containerFluid>
            <div className="flex mt-6 gap-8">
                {/* Sidebar */}
                <ChangesPageSidebar
                    selectedCampaignSub={selectedCampaignSub}
                    onSelect={(campaignSub) => {
                        setSelectedCampaignSub(campaignSub);

                        const element = document.getElementById(campaignSub.domId);
                        if (!element) return;

                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({top: offsetPosition, behavior: 'smooth'});

                        const toggleClassList = ['!border-indigo-500', '!bg-indigo-50', 'bg-opacity-10'];
                        toggleClassList.forEach((toggleClass) => {
                            element.classList.add(toggleClass);
                            setTimeout(() => {
                                element.classList.remove(toggleClass);
                            }, 3000);
                        });
                    }}
                />

                {/* MainContent */}
                <ChangesPageMainContent selectedCampaignSub={selectedCampaignSub} />
            </div>
        </OrgReviewCampaignDetailLayout>
    );
});
