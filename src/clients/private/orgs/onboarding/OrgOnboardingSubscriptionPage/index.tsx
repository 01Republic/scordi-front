import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {Button} from '^public/components/ui/button';
import {OrgOnboardingSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection';
import {OnboadingLayout} from '../OnboadingLayout';

export const OrgOnboardingSubscriptionPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboadingLayout
            step={1}
            title={`먼저,이용 중인 구독을\n불러올게요`}
            description={`결제내역을 기반으로 구독을 불러와\n스코디로 한 곳에서 관리해요`}
            image="/images/examples/ex_subscription.png"
            button={
                <Button
                    variant="scordi"
                    size="xxl"
                    onClick={() => {
                        router.push(OrgOnboardingSubscriptionConnectionPageRoute.path(orgId));
                    }}
                >
                    구독 불러오기
                </Button>
            }
        />
    );
});
