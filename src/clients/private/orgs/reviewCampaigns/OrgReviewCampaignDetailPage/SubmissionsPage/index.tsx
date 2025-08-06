import {useIdParam} from '^atoms/common';
import {LoadableBox2} from '^components/util/loading';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {useReviewResponses} from '^models/ReviewResponse/hook';
import {FindAllReviewResponsesQueryDto} from '^models/ReviewResponse/type';
import {Button} from '^public/components/ui/button';
import {Search} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {OrgReviewCampaignDetailLayout} from '../layout';
import {ReviewResponseItem} from './ReviewResponseItem';
import {SubmissionSidebarTab, t_SubmissionsSidebarTab} from './SubmissionSidebarTab.enum';
import {SubmissionsPageSideBar} from './SubmissionsPageSideBar';

export const OrgReviewCampaignDetailSubmissionsPage = memo(() => {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {t} = useTranslation('reviewCampaigns');
    const {data: reviewCampaign} = useReviewCampaign(orgId, id);
    const {
        data: {items: reviewResponses, pagination},
        isFetching,
        params,
        search,
        nextPage,
        refetch,
    } = useReviewResponses(orgId, id, {
        relations: ['teamMember', 'teamMember.slackMember'],
        page: 1,
    });

    const [currentTab, setCurrentTab] = useState<SubmissionSidebarTab>(SubmissionSidebarTab.All);
    const searchWhere = (where?: FindAllReviewResponsesQueryDto['where']) => search((prev) => ({...prev, where}));

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="flex mt-6 gap-8">
                {/* Sidebar */}
                <SubmissionsPageSideBar
                    reviewCampaign={reviewCampaign}
                    currentTab={currentTab}
                    onTabChange={(tab) => {
                        setCurrentTab(tab);
                        switch (tab) {
                            case SubmissionSidebarTab.Submitted:
                                return searchWhere({submittedAt: {op: 'not', val: 'NULL'}});
                            case SubmissionSidebarTab.Pending:
                                return searchWhere({submittedAt: 'NULL'});
                            case SubmissionSidebarTab.All:
                            default:
                                return searchWhere({});
                        }
                    }}
                />

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-base">
                            <span>{t_SubmissionsSidebarTab(currentTab)}</span>
                            <span className="text-primaryColor-900 ml-2.5">
                                {pagination.totalItemCount.toLocaleString()}
                            </span>
                        </h3>

                        <div className="relative">
                            <Search className="absolute left-2.5 top-0 bottom-0 my-auto h-4 w-4 text-gray-500" />
                            <input
                                placeholder={t('submissions.searchPlaceholder') as string}
                                className="input input-bordered input-sm pl-8"
                                value={params.keyword}
                                onChange={(e) => {
                                    const keyword = e.target.value.trim();
                                    return search((query) => ({...query, keyword}));
                                }}
                            />
                        </div>
                    </div>

                    <LoadableBox2 isLoading={isFetching}>
                        {reviewResponses.length === 0 ? (
                            <div className="text-center p-8 text-gray-500">{t('submissions.noResponses')}</div>
                        ) : (
                            <div className="border rounded-lg overflow-hidden mt-4 bg-white">
                                <div className="divide-y">
                                    {reviewResponses.map((response) => (
                                        <ReviewResponseItem
                                            key={response.id}
                                            response={response}
                                            campaign={reviewCampaign}
                                            reload={() => refetch()}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </LoadableBox2>

                    {pagination.currentPage < pagination.totalPage && (
                        <div className="flex items-center justify-center mt-4">
                            <Button variant="outline" onClick={() => nextPage()}>
                                {t('submissions.loadMore')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
});
