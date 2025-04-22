import React, {useEffect, useState} from 'react';
import {ChevronDown, HelpCircle} from 'lucide-react';
import {ReviewCampaignDto, ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {ReviewResponseSubscriptionDto, ReviewResponseSubscriptionUsingStatus} from '^models/ReviewResponse/type';
import {CheckBoxButton} from './CheckBoxButton';
import {UsingStatusColumn} from './UsingStatusColumn';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {Avatar} from '^components/Avatar';

interface CampaignSubscriptionBoardProps {
    campaign?: ReviewCampaignDto;
    campaignSubscription: ReviewCampaignSubscriptionDto;
    responseSubscriptions: ReviewResponseSubscriptionDto[];
    isFocused: boolean;
    isConfirmed: boolean;
    toggleConfirm: (confirmed: boolean) => any;
    reload: () => any;
}

/**
 * 승인을 위한 구독별 칸반보드
 */
export function CampaignSubBoard(props: CampaignSubscriptionBoardProps) {
    const orgId = useIdParam('id');
    const {campaign, campaignSubscription, responseSubscriptions, isFocused, isConfirmed, toggleConfirm, reload} =
        props;
    const [isExpanded, setIsExpanded] = useState(!isConfirmed);
    const groupedResponseSubs = ReviewResponseSubscriptionDto.groupByUsingStatus(responseSubscriptions);

    // Kanban States
    const [dragItem, setDragItem] = useState<ReviewResponseSubscriptionDto>();

    useEffect(() => {
        setIsExpanded(!isConfirmed);
    }, [isConfirmed]);

    useEffect(() => {
        if (isFocused) setIsExpanded(true);
    }, [isFocused]);

    return (
        <div id={campaignSubscription.domId} tabIndex={0} className="group border rounded-lg bg-white transition-all">
            <div className="flex items-center justify-between p-2">
                <div className="flex flex-1 items-center gap-2 cursor-pointer" onClick={() => setIsExpanded((v) => !v)}>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                    <div className="flex items-center gap-2">
                        <Avatar
                            className="w-[20px]"
                            src={campaignSubscription.productImage}
                            alt={campaignSubscription.productName}
                            draggable={false}
                            loading="lazy"
                        >
                            <HelpCircle size={20} className="text-gray-300 h-full w-full p-[6px]" />
                        </Avatar>
                        <span className="font-medium text-14">{campaignSubscription.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {!campaignSubscription.hasChanged() && (
                        <p className="text-12 text-gray-400">기존 이용 상태에서 변경된 응답이 없어요</p>
                    )}

                    <CheckBoxButton checked={isConfirmed} onChange={toggleConfirm}>
                        <span className="font-medium">확인 완료</span>
                    </CheckBoxButton>
                </div>
            </div>

            <div className={`max-h-0 ${isExpanded ? '!max-h-screen' : ''} overflow-hidden transition-all duration-500`}>
                <div className="p-4 border-t grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        ReviewResponseSubscriptionUsingStatus.IN_USE,
                        ReviewResponseSubscriptionUsingStatus.NO_USE,
                        ReviewResponseSubscriptionUsingStatus.DONT_KNOW,
                    ].map((usingStatus) => (
                        <UsingStatusColumn
                            key={usingStatus}
                            usingStatus={usingStatus}
                            responseSubs={groupedResponseSubs[usingStatus]}
                            draggable={!campaign?.isClosed()}
                            dragItem={dragItem}
                            onDragStart={(item) => setDragItem(item)}
                            onDragEnd={() => setDragItem(undefined)}
                            onDrop={(usingStatus) => {
                                if (!dragItem) return;
                                const {campaignId} = campaignSubscription;

                                reviewCampaignApi.responseSubscriptions
                                    .update(orgId, campaignId, dragItem.id, {
                                        id: dragItem.id,
                                        subscriptionId: dragItem.subscriptionId,
                                        usingStatus,
                                    })
                                    .then(() => toast.success('변경했어요.'))
                                    .then(() => reload())
                                    .catch(errorToast);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
