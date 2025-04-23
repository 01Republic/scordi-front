import {memo} from 'react';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {useIdParam} from '^atoms/common';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import toast from 'react-hot-toast';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {errorToast} from '^api/api';

interface ChangesApproveButtonProps {
    reviewCampaign: ReviewCampaignDto;
}

export const ChangesApproveButton = memo((props: ChangesApproveButtonProps) => {
    const {reviewCampaign} = props;
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    const handleConfirm = async () => {
        if (!isActive('changes')) return router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id));

        const allCheckedCheckboxElement = document.getElementById('checkbox-all_checked');
        if (allCheckedCheckboxElement && allCheckedCheckboxElement.dataset?.state === 'unchecked') {
            toast('전체 확인이 필요해요');
            return;
        }

        const sync = () =>
            confirm2(
                <span className="text-xl">응답을 기반으로 구독현황을 업데이트 할까요?</span>,
                <div className="text-16">
                    <div>구성원의 구독 사용 변경사항을 모두 확인해주세요.</div>
                    <div>전체 확인 완료 되었다면 승인할 수 있어요.</div>
                    <div>승인 이후에는 구독리스트 현황을 업데이트 해요.</div>
                    <br />
                    <div>그럼 변경사항을 모두 승인할까요?</div>
                </div>,
            );
        confirmed(sync())
            .then(() => reviewCampaignApi.approve(orgId, id))
            .then(() => toast.success('변경사항이 모두 승인되었습니다.'))
            .then(() => router.push(OrgReviewCampaignListPageRoute.path(orgId)))
            .catch(errorToast);
    };

    return (
        <Button id="review-campaign-confirm-btn" className="bg-scordi text-white" onClick={handleConfirm}>
            승인하기
        </Button>
    );
});
ChangesApproveButton.displayName = 'ChangesApproveButton';
