import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {Button} from '^public/components/ui/button';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {toast} from 'react-hot-toast';

interface CampaignFinishButtonProps {
    reviewCampaign: ReviewCampaignDto;
}

export const CampaignFinishButton = memo((props: CampaignFinishButtonProps) => {
    const {reviewCampaign} = props;
    const {t} = useTranslation('reviewCampaigns');
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    const onClick = () => {
        if (!isActive('submissions')) return router.push(OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, id));

        const remainCount = reviewCampaign.notSubmittedResponseCount;

        const dialog = () =>
            confirm2(
                <span className="text-xl">{t('finish.title')}</span>,
                !remainCount ? (
                    <div className="text-16">
                        <div>{t('finish.allCompleted')}</div>
                        <br />
                        <div>{t('finish.proceedMessage')}</div>
                    </div>
                ) : (
                    <div className="text-16">
                        <div>{t('common.notResponded', {remainCount: remainCount.toLocaleString()})}</div>
                        <br />
                        <div>{t('finish.notRespondedMessage')}</div>
                        <br />
                        <div>{t('finish.proceedMessage')}</div>
                    </div>
                ),
            );

        const finishAt = new Date();
        confirmed(dialog())
            .then(() => reviewCampaignApi.update(orgId, id, {finishAt}))
            .then(() => toast.success(t('finish.successMessage')))
            .then(() => router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id)))
            .catch(errorToast);
    };

    return (
        <Button id="review-campaign-finish-btn" className="bg-scordi text-white" onClick={onClick}>
            {t('finish.buttonText')}
        </Button>
    );
});
CampaignFinishButton.displayName = 'CampaignFinishButton';
