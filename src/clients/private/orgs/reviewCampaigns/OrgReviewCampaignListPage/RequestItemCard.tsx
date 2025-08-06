import {LinkTo} from '^components/util/LinkTo';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {Card} from '^public/components/ui/card';
import {Progress} from '^public/components/ui/progress';
import {cn} from '^public/lib/utils';
import {unitFormat} from '^utils/number';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useTranslation} from 'next-i18next';

interface RequestItemCardProps {
    item: ReviewCampaignDto;
}

export const RequestItemCard = (props: RequestItemCardProps) => {
    const {item: reviewCampaign} = props;
    const {t} = useTranslation('reviewCampaigns');
    const {organizationId, id} = reviewCampaign;

    const isOverdue = reviewCampaign.isOverdue(); // 마감여부
    const isFinished = reviewCampaign.isClosed(); // 완료여부
    // const badgeColor = isFinished ? 'bg-gray-300' : 'bg-black';
    const currentStatus = reviewCampaign.currentStatus;
    const progressValue = reviewCampaign.progressValue;
    const [progressBgColor, progressTextColor] = reviewCampaign.progressColors;

    return (
        <LinkTo href={OrgReviewCampaignDetailPageRoute.path(organizationId, id)} displayLoading={false}>
            <Card className="p-7 space-y-5 bg-white hover:shadow-lg cursor-pointer transition-all">
                <div className={'flex justify-between items-center'}>
                    <TagUI className={currentStatus.bgColor} noMargin>
                        {t(currentStatus.text)}
                    </TagUI>
                    {/*<Badge className={cn('text-white px-2', badgeColor)}>{currentStatus.text}</Badge>*/}
                    <div
                        className={cn(
                            `text-sm`,
                            currentStatus.textColor,
                            // isFinished ? 'text-gray-300' : 'text-slate-800',
                        )}
                    >
                        {reviewCampaign.isClosed()
                            ? t('list.card.completionDate', {date: reviewCampaign.closedAt?.toLocaleDateString()})
                            : isOverdue
                            ? t('list.card.deadline', {date: reviewCampaign.finishAt.toLocaleDateString()})
                            : t('list.card.startDate', {date: reviewCampaign.startAt.toLocaleDateString()})}
                    </div>
                </div>

                <div className={cn('text-md line-clamp-2', isFinished ? 'text-gray-300' : 'text-slate-900')}>
                    {reviewCampaign.title}
                </div>

                <div className={'space-y-1'}>
                    <div className={cn('text-sm', isFinished ? 'text-gray-300' : 'text-slate-800')}>
                        {t('list.card.submissionStatus', {
                            submitted: unitFormat(reviewCampaign.submittedResponseCount, t('common.person') as string),
                            total: unitFormat(reviewCampaign.totalResponseCount, t('common.person') as string),
                        })}
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
