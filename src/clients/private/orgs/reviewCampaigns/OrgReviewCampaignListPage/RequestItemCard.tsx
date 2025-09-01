import {cn} from '^public/lib/utils';
import {Card} from '^public/components/ui/card';
import {Badge} from '^public/components/ui/badge';
import {Progress} from '^public/components/ui/progress';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {LinkTo} from '^components/util/LinkTo';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {unitFormat} from '^utils/number';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {DeleteReviewCampaignItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/ReviewCampaignControl/DeleteReviewCampaignItem';
import {MoreDropdown, MoreDropdownButton, MoreDropdownMenu} from '^_components/rest-pages/ShowPage/MoreDropdown';
import {EllipsisVertical} from 'lucide-react';

interface RequestItemCardProps {
    item: ReviewCampaignDto;
    reload: () => void;
}

export const RequestItemCard = (props: RequestItemCardProps) => {
    const {item: reviewCampaign, reload} = props;
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
                        {currentStatus.text}
                    </TagUI>
                    {/*<Badge className={cn('text-white px-2', badgeColor)}>{currentStatus.text}</Badge>*/}
                    <div className="flex items-center gap-1">
                        <div
                            className={cn(
                                `text-sm`,
                                currentStatus.textColor,
                                // isFinished ? 'text-gray-300' : 'text-slate-800',
                            )}
                        >
                            {reviewCampaign.isClosed()
                                ? `완료일: ${reviewCampaign.closedAt?.toLocaleDateString()}`
                                : isOverdue
                                ? `마감일: ${reviewCampaign.finishAt.toLocaleDateString()}`
                                : `시작일: ${reviewCampaign.startAt.toLocaleDateString()}`}
                        </div>
                        {reviewCampaign && !reviewCampaign.isClosed() && (
                            <MoreDropdown
                                moreDropdownButton={() => (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                        aria-label="더보기"
                                    >
                                        <EllipsisVertical />
                                    </button>
                                )}
                                noMenu
                            >
                                <MoreDropdownMenu className="!min-w-[8rem]">
                                    {reviewCampaign && (
                                        <DeleteReviewCampaignItem reviewCampaign={reviewCampaign} reload={reload} />
                                    )}
                                </MoreDropdownMenu>
                            </MoreDropdown>
                        )}
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
