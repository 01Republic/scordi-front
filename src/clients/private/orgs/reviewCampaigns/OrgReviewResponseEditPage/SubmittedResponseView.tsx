import {orgIdParamState} from '^atoms/common';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {Button} from '^public/components/ui/button';
import {Check} from 'lucide-react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';

export const SubmittedResponseView = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <div
            className={
                'space-y-2 min-h-lvh max-w-screen-sm mx-auto py-20 flex flex-col items-center justify-center bg-gray-50'
            }
        >
            <div
                className={
                    'flex items-center justify-center gap-2 text-white w-14 h-14 bg-[#FB923C] rounded-full text-24 mb-3'
                }
            >
                <Check />
            </div>
            <div className={'text-24 font-medium text-gray-800'}>이미 요청 응답을 제출하셨어요.</div>
            <div className={'text-18 text-gray-800'}>참여해 주셔서 감사합니다!</div>
            <Button
                size={'xl'}
                variant={'scordi'}
                onClick={() => router.push(OrgReviewCampaignListPageRoute.path(Number(orgId)))}
            >
                홈으로 돌아가기
            </Button>
        </div>
    );
};
