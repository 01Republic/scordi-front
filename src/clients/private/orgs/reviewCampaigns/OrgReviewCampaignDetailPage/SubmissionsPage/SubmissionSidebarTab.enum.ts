import {ReviewCampaignDto} from '^models/ReviewCampaign/type';

export enum SubmissionSidebarTab {
    All = 'all',
    Pending = 'pending',
    Submitted = 'submitted',
}

export const t_SubmissionsSidebarTab = (tab: SubmissionSidebarTab) => {
    return {
        [SubmissionSidebarTab.All]: '전체',
        [SubmissionSidebarTab.Pending]: '미제출자',
        [SubmissionSidebarTab.Submitted]: '제출완료자',
    }[tab];
};

export const count_SubmissionsSidebarTab = (tab: SubmissionSidebarTab, reviewCampaign?: ReviewCampaignDto) => {
    return {
        [SubmissionSidebarTab.All]: reviewCampaign?.totalResponseCount || 0,
        [SubmissionSidebarTab.Pending]: reviewCampaign?.notSubmittedResponseCount || 0,
        [SubmissionSidebarTab.Submitted]: reviewCampaign?.submittedResponseCount || 0,
    }[tab];
};
