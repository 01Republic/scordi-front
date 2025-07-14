import React, {memo} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {OrgOnboardingSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection';
import exampleSubscriptionImage from 'src/images/onboarding/ex_subscription.png';
import {LinkTo} from '^components/util/LinkTo';
import {OnboardingLayout} from '../OnboardingLayout';
import {useRouter} from 'next/router';
import {OrgOnboardingMembersPageRoute} from '^pages/orgs/[id]/onboarding/members';

// 온보딩 스텝1. / 구독 불러오기 / 커버 페이지
export const OrgOnboardingSubscriptionPage = memo(() => {
    const orgId = useOrgIdParam();
    const router = useRouter();

    return (
        <OnboardingLayout
            step={1}
            title={`먼저,이용 중인\n구독을 불러올게요`}
            description={`결제내역을 기반으로 구독을 불러와\n스코디로 한 곳에서 관리해요.`}
            image={exampleSubscriptionImage}
            onSkip={() => router.push(OrgOnboardingMembersPageRoute.path(orgId))}
            button={
                <LinkTo
                    href={OrgOnboardingSubscriptionConnectionPageRoute.path(orgId)}
                    className="btn btn-scordi btn-block no-animation btn-animation"
                    displayLoading={false}
                >
                    구독 불러오기
                </LinkTo>
            }
        />
    );
});
