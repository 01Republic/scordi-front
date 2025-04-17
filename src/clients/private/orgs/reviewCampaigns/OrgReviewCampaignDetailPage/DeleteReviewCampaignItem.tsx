import {memo} from 'react';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {MoreDropdownMenuItem} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {useRouter} from 'next/router';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';

interface DeleteReviewCampaignItemProps {
    reviewCampaign: ReviewCampaignDto;
}

export const DeleteReviewCampaignItem = memo((props: DeleteReviewCampaignItemProps) => {
    const {reviewCampaign} = props;
    const router = useRouter();

    const onClick = async () => {
        if (!reviewCampaign) return;
        const {id, organizationId} = reviewCampaign;

        confirmed(confirmDestroy())
            .then(() => reviewCampaignApi.destroy(organizationId, id))
            .then(() => toast.success('요청을 삭제했어요.'))
            .then(() => router.replace(OrgReviewCampaignListPageRoute.path(organizationId)))
            .catch(errorToast);
    };

    return (
        <MoreDropdownMenuItem onClick={onClick} theme="danger" size="none" className="p-2 text-14">
            <div>삭제하기</div>
        </MoreDropdownMenuItem>
    );
});
DeleteReviewCampaignItem.displayName = 'DeleteReviewCampaignItem';

function confirmDestroy() {
    return confirm2(
        '요청을 삭제할까요?',
        <div>
            <p>이 작업은 취소 할 수 없습니다.</p>
            <p>
                <b>워크스페이스 전체</b>에서 삭제됩니다.
            </p>
            <p>그래도 삭제할까요?</p>
        </div>,
        'warning',
    );
}
