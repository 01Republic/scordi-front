import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface ChangesPageContentTitleProps {
    campaign: ReviewCampaignDto;
    totalCount: number;
    leftCount: number;
}

export const ChangesPageContentTitle = memo((props: ChangesPageContentTitleProps) => {
    const {campaign, totalCount, leftCount} = props;
    const {t} = useTranslation('reviewCampaigns');

    if (campaign.approvedAt || campaign.isClosed()) return <></>;

    // 마감되지 않은 요청에 대하여
    if (!campaign.isOverdue()) {
        return (
            <span>
                {t('changes.finishRequired')}{' '}
                <b
                    className="text-scordi animate-pulse hover:animate-none cursor-pointer btn-animation"
                    onClick={() => document.getElementById('review-campaign-finish-btn')?.click()}
                >
                    {t('changes.finishButton')}
                </b>{' '}
                {campaign.notSubmittedResponseCount > 0 && (
                    <span className="text-12 font-medium">
                        (
                        {t('changes.notSubmittedCount', {
                            notSubmittedResponseCount: campaign.notSubmittedResponseCount.toLocaleString(),
                        })}
                        )
                    </span>
                )}
            </span>
        );
    }

    if (leftCount) {
        return <span>{t('changes.approvalWaiting', {notSubmittedResponseCount: leftCount.toLocaleString()})}</span>;
    }

    return (
        <span>
            {t('changes.almostDone')}{' '}
            <b
                className="text-scordi animate-pulse hover:animate-none cursor-pointer btn-animation"
                onClick={() => document.getElementById('review-campaign-confirm-btn')?.click()}
            >
                {t('changes.approveButton')}
            </b>{' '}
            {t('changes.approveMessage')}
        </span>
    );
});
ChangesPageContentTitle.displayName = 'ChangesPageContentTitle';
