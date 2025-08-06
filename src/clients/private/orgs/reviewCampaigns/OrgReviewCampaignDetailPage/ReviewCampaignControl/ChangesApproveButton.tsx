import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {Button} from '^public/components/ui/button';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import toast from 'react-hot-toast';

interface ChangesApproveButtonProps {
    reviewCampaign: ReviewCampaignDto;
}

export const ChangesApproveButton = memo((props: ChangesApproveButtonProps) => {
    const {reviewCampaign} = props;
    const {t} = useTranslation('reviewCampaigns');
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    const handleConfirm = async () => {
        if (!isActive('changes')) return router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id));

        const allCheckedCheckboxElement = document.getElementById('checkbox-all_checked');
        if (allCheckedCheckboxElement && allCheckedCheckboxElement.dataset?.state === 'unchecked') {
            toast(t('approve.needFullCheck'));
            return;
        }

        const sync = () =>
            confirm2(
                <span className="text-xl">{t('approve.confirmTitle')}</span>,
                <div className="text-16">
                    <div>{t('approve.confirmMessage')}</div>
                    <div>{t('approve.confirmComplete')}</div>
                    <div>{t('approve.confirmUpdate')}</div>
                    <br />
                    <div>{t('approve.confirmFinal')}</div>
                </div>,
            );
        confirmed(sync())
            .then(() => reviewCampaignApi.approve(orgId, id))
            .then(() => toast.success(t('approve.success')))
            .then(() => router.push(OrgReviewCampaignListPageRoute.path(orgId)))
            .catch(errorToast);
    };

    return (
        <Button id="review-campaign-confirm-btn" className="bg-scordi text-white" onClick={handleConfirm}>
            {t('approve.button')}
        </Button>
    );
});
ChangesApproveButton.displayName = 'ChangesApproveButton';
