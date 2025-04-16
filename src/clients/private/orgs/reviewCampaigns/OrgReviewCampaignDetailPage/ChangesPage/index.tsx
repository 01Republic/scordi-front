import {memo} from 'react';
import {OrgReviewCampaignDetailLayout} from '../layout';
import {ChangesPageSidebar} from './ChangesPageSidebar';
import {ChangesPageMainContent} from './ChangesPageMainContent';

export const OrgReviewCampaignDetailChangesPage = memo(() => {
    return (
        <OrgReviewCampaignDetailLayout containerFluid>
            <div className="flex mt-6 gap-8">
                {/* Sidebar */}
                <ChangesPageSidebar
                    onSelect={(campaignSub) => {
                        const element = document.getElementById(campaignSub.domId);
                        if (!element) return;

                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({top: offsetPosition, behavior: 'smooth'});
                    }}
                />

                {/* MainContent */}
                <ChangesPageMainContent />
            </div>
        </OrgReviewCampaignDetailLayout>
    );
});
