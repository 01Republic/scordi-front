import {memo} from 'react';
import {useRouter} from 'next/router';
import {useIdParam} from '^atoms/common';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {Button} from '^public/components/ui/button';
import {OrgReviewCampaignDetailSubmissionsPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {toast} from 'react-hot-toast';
import {OrgReviewCampaignDetailChangesPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]/changes';
import {errorToast} from '^api/api';

interface CampaignFinishButtonProps {
    reviewCampaign: ReviewCampaignDto;
}

export const CampaignFinishButton = memo((props: CampaignFinishButtonProps) => {
    const {reviewCampaign} = props;
    const router = useRouter();
    const orgId = useIdParam('id');
    const id = useIdParam('reviewCampaignId');

    const isActive = (path: '' | 'submissions' | 'changes') => router.pathname.endsWith(path === '' ? ']' : path);

    const onClick = () => {
        if (!isActive('submissions')) return router.push(OrgReviewCampaignDetailSubmissionsPageRoute.path(orgId, id));

        const remainCount = reviewCampaign.notSubmittedResponseCount;

        const dialog = () =>
            confirm2(
                <span className="text-xl">접수를 마감할까요?</span>,
                !remainCount ? (
                    <div className="text-16">
                        <div>모든 구성원이 응답을 해주셨어요. 🎉</div>
                        <br />
                        <div>접수를 마감하고 다음으로 진행할까요?</div>
                    </div>
                ) : (
                    <div className="text-16">
                        <div>{remainCount.toLocaleString()}분이 아직 응답하지 않았어요. 💦</div>
                        <br />
                        <div>
                            이대로 마감하면 미제출 인원은 <br />
                            <span className="text-scordi font-semibold">
                                기존 시트 상태에서 변동이 없는 것으로 간주
                            </span>
                            됩니다.
                        </div>
                        <br />
                        <div>접수를 마감하고 다음으로 진행할까요?</div>
                    </div>
                ),
            );

        const finishAt = new Date();
        confirmed(dialog())
            .then(() => reviewCampaignApi.update(orgId, id, {finishAt}))
            .then(() => toast.success('접수를 마감했어요.'))
            .then(() => router.push(OrgReviewCampaignDetailChangesPageRoute.path(orgId, id)))
            .catch(errorToast);
    };

    return (
        <Button className="bg-scordi text-white" onClick={onClick}>
            접수 마감하기
        </Button>
    );
});
CampaignFinishButton.displayName = 'CampaignFinishButton';
