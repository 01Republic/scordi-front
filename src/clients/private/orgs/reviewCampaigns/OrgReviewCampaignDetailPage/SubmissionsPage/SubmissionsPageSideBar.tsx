import {memo} from 'react';
import {cn} from '^public/lib/utils';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {SubmissionSidebarTab, t_SubmissionsSidebarTab, count_SubmissionsSidebarTab} from './SubmissionSidebarTab.enum';

interface SubmissionsPageSideBarProps {
    reviewCampaign?: ReviewCampaignDto;
    currentTab?: SubmissionSidebarTab;
    onTabChange?: (tab: SubmissionSidebarTab) => any;
}

export const SubmissionsPageSideBar = memo((props: SubmissionsPageSideBarProps) => {
    const {reviewCampaign, currentTab = SubmissionSidebarTab.All, onTabChange} = props;

    const tabs = [SubmissionSidebarTab.All, SubmissionSidebarTab.Pending, SubmissionSidebarTab.Submitted];

    return (
        <div className="w-[240px]">
            <div className="space-y-2 text-sm">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={cn(
                            'relative h-8 flex items-center rounded-md px-2 py-1.5 cursor-pointer transition-all btn-animation',
                            currentTab === tab ? 'bg-scordi-light-100' : 'hover:bg-scordi-50',
                        )}
                        onClick={() => onTabChange && onTabChange(tab)}
                    >
                        {currentTab === tab && <div className="absolute left-0 inset-y-1 w-1 bg-scordi rounded-full" />}
                        <div
                            className={`w-full flex items-center ml-2 font-medium ${
                                currentTab === tab ? 'text-scordi' : 'text-gray-700'
                            }`}
                        >
                            <div className="">{t_SubmissionsSidebarTab(tab)}</div>
                            <div className="ml-auto">
                                <div className="bg-white border min-w-[22px] flex items-center justify-center rounded-lg">
                                    {count_SubmissionsSidebarTab(tab, reviewCampaign).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});
SubmissionsPageSideBar.displayName = 'SubmissionsPageSideBar';
