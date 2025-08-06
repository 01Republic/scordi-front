import {errorToast} from '^api/api';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {toast} from 'react-hot-toast';

interface DeleteReviewCampaignItemProps {
    reviewCampaign: ReviewCampaignDto;
}

export const DeleteReviewCampaignItem = memo((props: DeleteReviewCampaignItemProps) => {
    const {reviewCampaign} = props;
    const {t} = useTranslation('reviewCampaigns');
    const router = useRouter();

    const onClick = async () => {
        if (!reviewCampaign) return;
        const {id, organizationId} = reviewCampaign;

        confirmed(confirmDestroy())
            .then(() => reviewCampaignApi.destroy(organizationId, id))
            .then(() => toast.success(t('delete.success')))
            .then(() => router.replace(OrgReviewCampaignListPageRoute.path(organizationId)))
            .catch(errorToast);
    };

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger" size="none" className="p-2 text-14">
            <div>{t('delete.button')}</div>
        </MoreDropdownMenuItem>
    );
});
DeleteReviewCampaignItem.displayName = 'DeleteReviewCampaignItem';

function confirmDestroy() {
    const {t} = useTranslation('reviewCampaigns');
    return confirm2(
        t('delete.confirmTitle') as string,
        <div>
            <p>{t('delete.confirmMessage')}</p>
            <p>
                <b>{t('delete.confirmWorkspace')}</b>
            </p>
            <p>{t('delete.confirmFinal')}</p>
        </div>,
        'warning',
    );
}
