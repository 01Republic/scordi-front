import {useEffect, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Checkbox} from '^public/components/ui/checkbox';
import {ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {
    ReviewResponseSubscriptionDto,
    ReviewResponseSubscriptionUsingStatus,
    t_reviewResponseSubscriptionUsingStatus,
    c_reviewResponseSubscriptionUsingStatus,
} from '^models/ReviewResponse/type';
import {ResponseSubCard} from './ResponseSubCard';
import {CheckBoxButton} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/ChangesPage/CheckBoxButton';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface ChangesItemProps {
    campaignSubscription: ReviewCampaignSubscriptionDto;
    responseSubscriptions: ReviewResponseSubscriptionDto[];
    isFocused: boolean;
    isConfirmed: boolean;
    toggleConfirm: (confirmed: boolean) => any;
}

/**
 * 승인을 위한 구독별 칸반보드
 */
export function ChangesItem(props: ChangesItemProps) {
    const {campaignSubscription, responseSubscriptions, isFocused, isConfirmed, toggleConfirm} = props;
    const [isExpanded, setIsExpanded] = useState(!isConfirmed);
    const groupedResponseSubs = ReviewResponseSubscriptionDto.groupByUsingStatus(responseSubscriptions);

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
                        <span className="font-medium text-14">{campaignSubscription.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
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
                    ].map((usingStatus, i) => {
                        const title = t_reviewResponseSubscriptionUsingStatus(usingStatus);
                        const [bgColor, textColor] = c_reviewResponseSubscriptionUsingStatus(usingStatus);
                        const responseSubs = groupedResponseSubs[usingStatus];

                        // 칸반의 한 열
                        return (
                            <div
                                key={i}
                                className={`bg-${bgColor} bg-opacity-30 rounded-lg p-2.5`}
                                onDragEnter={(e) => {
                                    console.log('Drag Enter', title, e.target);
                                }}
                            >
                                <div className="flex items-center mb-4 space-x-2">
                                    <TagUI className={`bg-${bgColor} text-${textColor}`} noMargin>
                                        {title}
                                    </TagUI>
                                    <span className={`text-12 text-${textColor} font-medium`}>
                                        {responseSubs.length}
                                    </span>
                                </div>

                                <div className="space-y-2.5">
                                    {responseSubs.map((responseSub) => (
                                        <ResponseSubCard key={responseSub.id} responseSub={responseSub} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
