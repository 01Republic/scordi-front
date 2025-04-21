import {orgIdParamState} from '^atoms/common';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {OrgReviewCampaignNewPageRoute} from '^pages/orgs/[id]/reviewCampaigns/new';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OnboadingLayout} from './OnboadingLayout';

export const OrgOnboardingRequestPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboadingLayout
            step={3}
            title={`구성원에게 이용 중인\n구독을 조사해요`}
            description={`실사용 여부를 파악해서 \n쓰지 않는 구독을 정리해요`}
            image="/images/examples/ex_request.png"
            onSkip={() => router.push(OrgMainPageRoute.path(orgId, {confetti: 'true'}))}
            button={
                <div className="flex flex-col gap-4">
                    <Button
                        variant="scordi"
                        size="xxl"
                        onClick={() => {
                            router.push(OrgReviewCampaignNewPageRoute.path(orgId, {type: 'onboarding'}));
                        }}
                    >
                        설문 요청하기
                    </Button>
                </div>
            }
        />
    );
});
