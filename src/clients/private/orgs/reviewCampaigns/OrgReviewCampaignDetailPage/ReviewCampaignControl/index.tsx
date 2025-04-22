import {memo} from 'react';
import {useRouter} from 'next/router';
import {
    MoreDropdown,
    MoreDropdownButton,
    MoreDropdownMenu,
} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {useIdParam} from '^atoms/common';
import {ChangesApproveButton} from './ChangesApproveButton';
import {DeleteReviewCampaignItem} from './DeleteReviewCampaignItem';
import {CampaignFinishButton} from './CampaignFinishButton';

interface ReviewCampaignControlProps {
    reviewCampaign?: ReviewCampaignDto;
}

export const ReviewCampaignControl = memo((props: ReviewCampaignControlProps) => {
    const {reviewCampaign} = props;
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    return (
        <div className="ml-auto flex items-center gap-2">
            {!reviewCampaign ? (
                <></>
            ) : reviewCampaign.approvedAt || reviewCampaign.isClosed() ? (
                <></>
            ) : !reviewCampaign.isOverdue() ? (
                <CampaignFinishButton reviewCampaign={reviewCampaign} />
            ) : (
                <ChangesApproveButton reviewCampaign={reviewCampaign} />
            )}

            {reviewCampaign && !reviewCampaign.isClosed() && (
                <MoreDropdown
                    moreDropdownButton={() => (
                        <MoreDropdownButton className="btn-square w-[36px] h-[36px] min-h-[auto] !m-0" />
                    )}
                    noMenu
                >
                    <MoreDropdownMenu className="!min-w-[8rem]">
                        {reviewCampaign && <DeleteReviewCampaignItem reviewCampaign={reviewCampaign} />}
                    </MoreDropdownMenu>
                </MoreDropdown>
            )}
        </div>
    );
});
ReviewCampaignControl.displayName = 'ReviewCampaignControl';
