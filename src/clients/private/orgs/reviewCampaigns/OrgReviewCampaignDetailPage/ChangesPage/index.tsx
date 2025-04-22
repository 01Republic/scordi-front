import {memo, useCallback, useMemo, useState} from 'react';
import {useIdParam} from '^atoms/common';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignSubscriptions} from '^models/ReviewCampaign/hook';
import {OrgReviewCampaignDetailLayout} from '../layout';
import {ChangesPageSidebar} from './ChangesPageSidebar';
import {ChangesPageMainContent} from './ChangesPageMainContent';

export const OrgReviewCampaignDetailChangesPage = memo(() => {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {data, refetch} = useReviewCampaignSubscriptions(orgId, id, {
        relations: ['responseSubscriptions'],
        order: {subscriptionId: 'DESC'},
        itemsPerPage: 0,
    });
    const [selectedCampaignSub, setSelectedCampaignSub] = useState<ReviewCampaignSubscriptionDto>();

    const campaignSubs = useMemo(() => {
        return data.items.filter((item) => item.hasChanged());
    }, [data.items]);

    const focusSub = useCallback((campaignSub: ReviewCampaignSubscriptionDto) => {
        const element = document.getElementById(campaignSub.domId);
        if (!element) return;

        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({top: offsetPosition, behavior: 'smooth'});

        const toggleClassList = ['!border-indigo-500', '!bg-indigo-50', 'bg-opacity-10'];
        toggleClassList.forEach((name) => element.classList.add(name));
        setTimeout(() => {
            toggleClassList.forEach((name) => element.classList.remove(name));
        }, 3000);
    }, []);

    return (
        <OrgReviewCampaignDetailLayout containerFluid>
            <div className="flex mt-6 gap-8">
                {/* Sidebar */}
                <ChangesPageSidebar
                    campaignSubs={campaignSubs}
                    selectedCampaignSub={selectedCampaignSub}
                    onSelect={(campaignSub) => {
                        setSelectedCampaignSub(campaignSub);
                        focusSub(campaignSub);
                    }}
                />

                {/* MainContent */}
                <ChangesPageMainContent
                    campaignSubs={campaignSubs}
                    reload={() => refetch()}
                    selectedCampaignSub={selectedCampaignSub}
                />
            </div>
        </OrgReviewCampaignDetailLayout>
    );
});
