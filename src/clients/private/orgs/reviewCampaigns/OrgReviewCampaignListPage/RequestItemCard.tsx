import {cn} from '^public/lib/utils';
import {Card} from '^public/components/ui/card';
import {Badge} from '^public/components/ui/badge';
import {Progress} from '^public/components/ui/progress';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {LinkTo} from '^components/util/LinkTo';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {unitFormat} from '^utils/number';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface RequestItemCardProps {
    item: ReviewCampaignDto;
}

export const RequestItemCard = (props: RequestItemCardProps) => {
    const {item: reviewCampaign} = props;
    const {organizationId, id} = reviewCampaign;

    const isFinished = reviewCampaign.isOverdue();
    // const badgeColor = isFinished ? 'bg-gray-300' : 'bg-black';
    const currentStatus = reviewCampaign.currentStatus;
    const progressValue = reviewCampaign.progressValue;
    const [progressBgColor, progressTextColor] = reviewCampaign.progressColors;

    return (
        <LinkTo href={OrgReviewCampaignDetailPageRoute.path(organizationId, id)} displayLoading={false}>
            <Card className="p-7 space-y-5 bg-white hover:shadow-lg cursor-pointer transition-all">
                <div className={'flex justify-between items-center'}>
                    <TagUI className={currentStatus.bgColor} noMargin>
                        {currentStatus.text}
                    </TagUI>
                    {/*<Badge className={cn('text-white px-2', badgeColor)}>{currentStatus.text}</Badge>*/}
                    <div
                        className={cn(
                            `text-sm`,
                            currentStatus.textColor,
                            // isFinished ? 'text-gray-300' : 'text-slate-800',
                        )}
                    >
                        {isFinished
                            ? `마감일: ${reviewCampaign.finishAt.toLocaleDateString()}`
                            : `시작일: ${reviewCampaign.startAt.toLocaleDateString()}`}
                    </div>
                </div>

                <div className={cn('text-md line-clamp-2', isFinished ? 'text-gray-300' : 'text-slate-900')}>
                    {reviewCampaign.title}
                </div>

                <div className={'space-y-1'}>
                    <div className={cn('text-sm', isFinished ? 'text-gray-300' : 'text-slate-800')}>
                        제출 현황 ({unitFormat(reviewCampaign.submittedResponseCount, '명')} /
                        {unitFormat(reviewCampaign.totalResponseCount, '명')})
                    </div>
                    <div className={cn(`flex items-center justify-between gap-4 font-medium`)}>
                        <Progress
                            value={progressValue}
                            className={'h-2 bg-gray-100'}
                            indicatorClassName={cn(isFinished ? 'bg-gray-100' : progressBgColor)}
                        />
                        <span
                            className={cn('text-sm', isFinished ? 'text-gray-300' : progressTextColor)}
                        >{`${progressValue}%`}</span>
                    </div>
                </div>
            </Card>
        </LinkTo>
    );
};
