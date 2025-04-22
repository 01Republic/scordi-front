import {memo, useCallback, useState} from 'react';
import {useIdParam} from '^atoms/common';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {useReviewCampaign, useReviewCampaignSubscriptions} from '^models/ReviewCampaign/hook';
import {LoadableBox2} from '^components/util/loading';
import {OrgReviewCampaignDetailLayout} from '../layout';
import {ChangesPageSidebar} from './ChangesPageSidebar';
import {ChangesPageMainContent} from './ChangesPageMainContent';

export const OrgReviewCampaignDetailChangesPage = memo(() => {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {data: campaign} = useReviewCampaign(orgId, id);
    const {data, refetch, isFetching} = useReviewCampaignSubscriptions(orgId, id, {
        relations: ['responseSubscriptions'],
        order: {subscriptionId: 'DESC'},
        itemsPerPage: 0,
    });
    const [selectedCampaignSub, setSelectedCampaignSub] = useState<ReviewCampaignSubscriptionDto>();

    const campaignSubs = data.items;
    // const campaignSubs = useMemo(() => {
    //     return data.items.filter((item) => item.hasChanged());
    // }, [data.items]);

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
        <OrgReviewCampaignDetailLayout>
            {campaignSubs.length === 0 ? (
                <div className="flex items-center justify-center min-h-52">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-xl text-gray-400 font-semibold">요청에 조사할 구독이 없어요.</p>
                    </div>
                </div>
            ) : (
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
                        campaign={campaign}
                        campaignSubs={campaignSubs}
                        reload={() => refetch()}
                        selectedCampaignSub={selectedCampaignSub}
                    />
                </div>
            )}
        </OrgReviewCampaignDetailLayout>
    );
});
