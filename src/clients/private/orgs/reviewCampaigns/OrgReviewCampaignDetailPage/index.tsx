import {useIdParam} from '^atoms/common';
import {useReviewCampaign, useReviewCampaignAuthor} from '^models/ReviewCampaign/hook';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {Card} from '^public/components/ui/card';
import {Progress} from '^public/components/ui/progress';
import {cn} from '^public/lib/utils';
import {unitFormat} from '^utils/number';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {format} from 'date-fns';
import {useTranslation} from 'next-i18next';
import {OrgReviewCampaignDetailLayout} from './layout';

export default function OrgReviewCampaignDetailPage() {
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');
    const {t} = useTranslation('reviewCampaigns');
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
                                <span className="text-muted-foreground">{t('detail.requester')}</span>

                                <div>
                                    {authorMember ? (
                                        <TeamMemberProfileCompact item={authorMember} />
                                    ) : (
                                        <div className="text-gray-400 italic">{t('detail.none')}</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{t('detail.status')}</span>
                                {currentStatus && (
                                    <TagUI className={currentStatus.bgColor} noMargin>
                                        {t(currentStatus.text)}
                                    </TagUI>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{t('detail.startDate')}</span>
                                {reviewCampaign && (
                                    <span>{format(reviewCampaign.startAt, 'yyyy년 MM월 dd일 HH:mm')}</span>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">{t('detail.endDate')}</span>
                                {reviewCampaign && (
                                    <div>
                                        {reviewCampaign.finishAt
                                            ? format(reviewCampaign.finishAt, 'yyyy년 MM월 dd일 HH:mm')
                                            : t('detail.undetermined')}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{t('detail.submissionStatus')}</span>

                                    {reviewCampaign && (
                                        <div>
                                            <span className="mr-2">
                                                {unitFormat(
                                                    reviewCampaign.submittedResponseCount,
                                                    t('common.person') as string,
                                                )}{' '}
                                                /{' '}
                                                {unitFormat(
                                                    reviewCampaign.totalResponseCount,
                                                    t('common.person') as string,
                                                )}
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
