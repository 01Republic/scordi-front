import React, {useState} from 'react';
import {cn} from '^public/lib/utils';
import {useIdParam} from '^atoms/common';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {useReviewCampaignSubscriptions} from '^models/ReviewCampaign/hook';
import {Avatar} from '^components/Avatar';
import {HelpCircle} from 'lucide-react';

interface ChangesPageSidebarProps {
    selectedCampaignSub?: ReviewCampaignSubscriptionDto;
    onSelect: (campaignSub: ReviewCampaignSubscriptionDto) => any;
}

export function ChangesPageSidebar(props: ChangesPageSidebarProps) {
    const {selectedCampaignSub, onSelect} = props;
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {
        data: {items: campaignSubscriptions, pagination},
    } = useReviewCampaignSubscriptions(orgId, id, {
        order: {subscriptionId: 'DESC'},
        itemsPerPage: 0,
    });

    return (
        <div className="w-[240px] sticky top-4">
            <div className="space-y-2 text-sm">
                {campaignSubscriptions.map((campaignSub, i) => {
                    const isActive = selectedCampaignSub ? selectedCampaignSub.id === campaignSub.id : i === 0;
                    return (
                        <div
                            key={campaignSub.id}
                            onClick={() => onSelect(campaignSub)}
                            className={cn(
                                'relative h-8 flex items-center rounded-md px-2 py-1.5 cursor-pointer transition-all btn-animation',
                                isActive ? 'bg-scordi-light-100' : 'hover:bg-scordi-50',
                            )}
                        >
                            {isActive && <div className="absolute left-0 inset-y-1 w-1 bg-scordi rounded-full" />}
                            <div
                                className={`w-full flex items-center ml-2 font-medium ${
                                    isActive ? 'text-scordi' : 'text-gray-700'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        className="w-[20px]"
                                        src={campaignSub.productImage}
                                        alt={campaignSub.productName}
                                        draggable={false}
                                        loading="lazy"
                                    >
                                        <HelpCircle size={20} className="text-gray-300 h-full w-full p-[6px]" />
                                    </Avatar>
                                    <div>{campaignSub.title}</div>
                                </div>
                                <div className="ml-auto">
                                    {/*<div className="bg-white border min-w-[22px] flex items-center justify-center rounded-lg" />*/}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
