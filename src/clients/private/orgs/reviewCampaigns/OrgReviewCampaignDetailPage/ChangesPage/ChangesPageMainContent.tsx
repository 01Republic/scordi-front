import React, {memo, useState} from 'react';
import {useListControl} from '^hooks/useResource';
import {Progress} from '^public/components/ui/progress';
import {ReviewCampaignDto, ReviewCampaignSubscriptionDto} from '^models/ReviewCampaign/type';
import {CampaignSubBoard} from './CampaignSubBoard';
import {CheckBoxButton} from './CheckBoxButton';
import {ChangesPageContentTitle} from './ChangesPageContentTitle';

interface ChangesPageMainContentProps {
    campaign: ReviewCampaignDto;
    campaignSubs: ReviewCampaignSubscriptionDto[];
    reload: () => any;
    selectedCampaignSub?: ReviewCampaignSubscriptionDto;
}

export const ChangesPageMainContent = memo((props: ChangesPageMainContentProps) => {
    const {campaign, campaignSubs, reload, selectedCampaignSub} = props;
    const [confirmedSubs, setConfirmedSubs] = useState<ReviewCampaignSubscriptionDto[]>(() => {
        // 아직 마감되지 않은 요청의 응답결과는 모두 확인되지 않은 상태로 초기화 합니다.
        if (!campaign.isOverdue()) return [];

        // 모든 응답이 "유지" 상태인 대상구독은 기본적으로 "확인완료" 상태로 초기화 됩니다.
        return campaignSubs.filter((campaignSub) => !campaignSub.hasChanged());
    });
    const {add: addConfirmedSubs, remove: removeConfirmedSubs} = useListControl(setConfirmedSubs, (item) => item.id);

    const totalCount = campaignSubs.length;
    const confirmedCount = confirmedSubs.length;
    const leftCount = totalCount - confirmedCount;
    const progress = totalCount > 0 ? Math.round((confirmedCount / totalCount) * 100) : 0;

    return (
        <div className="flex-1">
            {!campaign.isClosed() && (
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-base">
                        <ChangesPageContentTitle campaign={campaign} totalCount={totalCount} leftCount={leftCount} />
                    </h3>

                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-700">
                                {confirmedCount} / {totalCount} 확인 완료
                            </span>
                            <Progress
                                value={progress}
                                className="w-32 h-2 mt-1.5 bg-neutral-100"
                                indicatorClassName="bg-primaryColor-900"
                            />
                        </div>
                        <CheckBoxButton
                            checked={totalCount > 0 && confirmedCount === totalCount}
                            onChange={(checked) => setConfirmedSubs(checked ? campaignSubs : [])}
                        >
                            <span className="font-medium">전체 확인 완료</span>
                        </CheckBoxButton>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                {campaignSubs.map((campaignSub) => {
                    const responseSubs = campaignSub.responseSubscriptions || [];
                    const entries = responseSubs.filter((responseSub) => {
                        if (responseSub.subscriptionId !== campaignSub.subscriptionId) return false;

                        // 요청이 마감되지 않았으면
                        // if (!campaign.isOverdue()) {
                        //     // 미제출 응답은 제외
                        //     if (!responseSub.submittedAt) return false;
                        // }

                        return true;
                    });

                    return (
                        <CampaignSubBoard
                            key={campaignSub.id}
                            campaign={campaign}
                            campaignSubscription={campaignSub}
                            responseSubscriptions={entries}
                            isFocused={!!selectedCampaignSub && selectedCampaignSub.id === campaignSub.id}
                            isConfirmed={confirmedSubs.some((sub) => sub.id === campaignSub.id)}
                            toggleConfirm={(checked) => {
                                checked ? addConfirmedSubs(campaignSub) : removeConfirmedSubs(campaignSub);
                            }}
                            reload={reload}
                        />
                    );
                })}
            </div>
        </div>
    );
});
ChangesPageMainContent.displayName = 'ChangesPageMainContent';
