import {Card} from '^public/components/ui/card';
import {useReviewCampaign, useReviewCampaignAuthor} from '^models/ReviewCampaign/hook';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {format} from 'date-fns';
import {Progress} from '^public/components/ui/progress';
import {cn} from '^public/lib/utils';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {unitFormat} from '^utils/number';
import {OrgReviewCampaignDetailLayout} from './layout';

export default function OrgReviewCampaignDetailPage() {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {data: reviewCampaign} = useReviewCampaign(orgId, id);
    const {data: authorMember} = useReviewCampaignAuthor(orgId, id);

    const currentStatus = reviewCampaign?.currentStatus;
    const progressValue = reviewCampaign?.progressValue;
    const [progressBgColor, progressTextColor] = reviewCampaign?.progressColors || ['', ''];

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <Card className="p-6 bg-white">
                        <div className="space-y-4 whitespace-pre-wrap">{reviewCampaign?.description || ''}</div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div>
                    <Card className="p-6 text-sm bg-white">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">생성자</span>

                                <div>
                                    {authorMember ? (
                                        <TeamMemberProfileCompact item={authorMember} />
                                    ) : (
                                        <div className="text-gray-400 italic">없음</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">상태</span>
                                {currentStatus && (
                                    <TagUI className={currentStatus.bgColor} noMargin>
                                        {currentStatus.text}
                                    </TagUI>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">시작일</span>
                                {reviewCampaign && <span>{format(reviewCampaign.startAt, 'yyyy년 MM월 dd일')}</span>}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">종료일</span>
                                {reviewCampaign && (
                                    <div>
                                        {reviewCampaign.finishAt
                                            ? format(reviewCampaign.finishAt, 'yyyy년 MM월 dd일')
                                            : '미정'}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">제출 현황</span>

                                    {reviewCampaign && (
                                        <div>
                                            <span className="mr-2">
                                                {unitFormat(reviewCampaign.submittedResponseCount, '명')} /{' '}
                                                {unitFormat(reviewCampaign.totalResponseCount, '명')}
                                            </span>
                                            <span className={cn(progressTextColor)}>{`(${progressValue}%)`}</span>
                                        </div>
                                    )}
                                </div>
                                <Progress
                                    value={progressValue}
                                    className="w-full bg-gray-200 h-2 rounded-full"
                                    indicatorClassName={cn(progressBgColor)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}
