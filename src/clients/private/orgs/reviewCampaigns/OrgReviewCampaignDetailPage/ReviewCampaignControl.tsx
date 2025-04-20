import {memo} from 'react';
import {useRouter} from 'next/router';
import toast from 'react-hot-toast';
import {errorToast} from '^api/api';
import {Button} from '^public/components/ui/button';
import {
    MoreDropdown,
    MoreDropdownButton,
    MoreDropdownMenu,
} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {useIdParam} from '^atoms/common';
import {DeleteReviewCampaignItem} from './DeleteReviewCampaignItem';

interface ReviewCampaignControlProps {
    reviewCampaign?: ReviewCampaignDto;
}

export const ReviewCampaignControl = memo((props: ReviewCampaignControlProps) => {
    const {reviewCampaign} = props;
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    const handleConfirm = async () => {
        if (!isActive('changes')) return router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id));

        const sync = () =>
            confirm2(
                <span className="text-xl">응답을 기반으로 구독현황을 업데이트 할까요?</span>,
                <div className="text-16">
                    <div>구성원의 구독 사용 변경사항을 모두 확인해주세요.</div>
                    <div>전체 확인 완료 되었다면 승인할 수 있어요.</div>
                    <div>승인 이후에는 구독리스트 현황을 업데이트 해요.</div>
                    <br />
                    <div>그럼 변경사항을 모두 승인할까요? </div>
                </div>,
            );
        confirmed(sync())
            .then(() => reviewCampaignApi.approve(orgId, id))
            .then(() => toast.success('변경사항이 모두 승인되었습니다.'))
            .then(() => router.push(OrgReviewCampaignListPageRoute.path(orgId)))
            .catch(errorToast);
    };

    return (
        <div className="ml-auto flex items-center gap-2">
            <Button id="review-campaign-confirm-btn" className="bg-scordi text-white" onClick={handleConfirm}>
                변경사항 승인하기
            </Button>

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
        </div>
    );
});
ReviewCampaignControl.displayName = 'ReviewCampaignControl';
