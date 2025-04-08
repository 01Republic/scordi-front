import {useRecoilValue} from 'recoil';
import {Badge} from '^public/components/ui/badge';
import {Card} from '^public/components/ui/card';
import {Avatar, AvatarFallback} from '^public/components/ui/avatar';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';
import {orgIdParamState} from '^atoms/common';
import OrgReviewCampaignDetailLayout from './layout';
import {useRouter} from 'next/router';
import {format} from 'date-fns';
import {Progress} from '^public/components/ui/progress';
import {cn} from '^public/lib/utils';

export default function OrgReviewCampaignDetailPage() {
    const reviewCampaignId = useRouter().query.reviewCampaignId as string;
    const orgId = useRecoilValue(orgIdParamState);
    const {data: reviewCampaign} = useReviewCampaign(orgId, parseInt(reviewCampaignId, 10));

    const currentStatus = (() => {
        if (!reviewCampaign) return '';

        const now = new Date();
        if (reviewCampaign.finishAt && reviewCampaign.finishAt < now) {
            return '마감';
        }
        if (reviewCampaign.closedAt && now >= reviewCampaign.closedAt) {
            return '완료';
        }
        return '진행 중';
    })();

    const progressValue = reviewCampaign?.submittedResponseCount
        ? Math.round((reviewCampaign.submittedResponseCount / reviewCampaign.totalResponseCount) * 100)
        : 0;
    const progressBackgroundColor =
        progressValue < 20 ? 'bg-red-500' : progressValue < 80 ? 'bg-orange-500' : 'bg-green-500';
    const progressTextColor =
        progressValue < 20 ? 'text-red-500' : progressValue < 80 ? 'text-red-500' : 'text-green-500';

    if (!reviewCampaign) return null;

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <h2 className="text-lg font-medium mb-4">본문 내용</h2>
                    <Card className="p-6 bg-white">
                        <div className="space-y-4">{reviewCampaign?.description || ''}</div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div>
                    <h2 className="text-base font-medium mb-4">세부 정보</h2>
                    <Card className="p-6 text-sm bg-white">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">생성자</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 bg-orange-500">
                                        <AvatarFallback className="text-xs text-white">
                                            {reviewCampaign?.author?.user?.name
                                                ? reviewCampaign.author.user.name.charAt(0).toUpperCase()
                                                : ''}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{reviewCampaign?.author?.user?.name || ''}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">상태</span>
                                <Badge variant="outline" className="bg-neutral-800 text-white px-2 py-1">
                                    {currentStatus}
                                </Badge>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">시작 날짜</span>
                                <span>{format(reviewCampaign.startAt, 'yyyy년 MM월 dd일')}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">종료 날짜</span>
                                <span>
                                    {reviewCampaign.finishAt
                                        ? format(reviewCampaign.finishAt, 'yyyy년 MM월 dd일')
                                        : '미정'}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">제출 현황</span>
                                    <div>
                                        <span className="mr-2">{`${reviewCampaign.submittedResponseCount}명 / ${reviewCampaign.totalResponseCount}명`}</span>
                                        <span className={cn(progressTextColor)}>{`(${progressValue}%)`}</span>
                                    </div>
                                </div>
                                <Progress
                                    value={progressValue}
                                    className="w-full bg-gray-200 h-2 rounded-full"
                                    indicatorClassName={cn(progressBackgroundColor)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}
