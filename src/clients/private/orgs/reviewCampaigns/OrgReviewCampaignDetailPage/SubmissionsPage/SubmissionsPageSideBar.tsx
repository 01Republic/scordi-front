import {memo, useState} from 'react';
import {cn} from '^public/lib/utils';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';

interface SubmissionsPageSideBarProps {
    reviewCampaign?: ReviewCampaignDto;
    currentTab?: 'all' | 'pending' | 'submitted';
    onTabChange?: (tab: 'all' | 'pending' | 'submitted') => any;
}

export const SubmissionsPageSideBar = memo((props: SubmissionsPageSideBarProps) => {
    const {reviewCampaign, currentTab = 'all', onTabChange} = props;

    const tabs = ['all', 'pending', 'submitted'] as const;
    const totalCount = reviewCampaign?.totalResponseCount || 0;
    const countSubmitted = reviewCampaign?.submittedResponseCount || 0;
    const countPending = reviewCampaign?.notSubmittedResponseCount || 0;

    return (
        <div className="w-[240px] mr-5">
            <div className="space-y-2 text-sm">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={cn(
                            'relative h-8 flex items-center rounded-md px-2 py-1.5 cursor-pointer transition-all btn-animation',
                            currentTab === tab ? 'bg-scordi-light-100 hover:bg-scordi-light-200' : 'hover:bg-scordi-50',
                        )}
                        onClick={() => {
                            onTabChange && onTabChange(tab);
                        }}
                    >
                        {currentTab === tab && (
                            <div className="absolute left-0 inset-y-1 w-1 bg-primaryColor-900 rounded-full"></div>
                        )}
                        <div className={cn('font-medium ml-2', currentTab === tab ? 'text-scordi' : 'text-gray-700')}>
                            {tab === 'all'
                                ? `전체 ${totalCount}`
                                : tab === 'submitted'
                                ? `제출완료자 ${countSubmitted}`
                                : `미제출자 ${countPending}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
SubmissionsPageSideBar.displayName = 'SubmissionsPageSideBar';
