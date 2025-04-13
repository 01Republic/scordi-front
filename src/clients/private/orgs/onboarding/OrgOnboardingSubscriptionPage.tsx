import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionConnectsPageRoute} from '^pages/orgs/[id]/subscriptions/connects';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {OnboadingLayout} from './OnboadingLayout';

export const OrgOnboardingSubscriptionPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboadingLayout
            step={1}
            title={`먼저,\n이용 중인 구독을\n불러올게요`}
            description={`결제내역을 기반으로 구독을 불러와\n스코디로 한 곳에서 관리해요`}
            image="/images/examples/ex_subscription.png"
            button={
                <Button
                    variant="scordiWhite"
                    size="xl"
                    onClick={() => {
                        /* TODO: 구독 등록 완료하면 다음 스텝으로 가야겠지? 어떻게 보낼지 고민 필요 */
                        router.push(OrgSubscriptionConnectsPageRoute.path(orgId));
                    }}
                >
                    시작하기
                </Button>
            }
        />
    );
});
