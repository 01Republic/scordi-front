import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgOnboardingSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection';
import exampleSubscriptionImage from 'src/images/onboarding/ex_subscription.png';
import {OnboardingLayout} from '../OnboardingLayout';
import {LinkTo} from '^components/util/LinkTo';

export const OrgOnboardingSubscriptionPage = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboardingLayout
            step={1}
            title={`먼저,이용 중인 구독을\n불러올게요`}
            description={`결제내역을 기반으로 구독을 불러와\n스코디로 한 곳에서 관리해요`}
            image={exampleSubscriptionImage}
            button={
                <LinkTo
                    href={OrgOnboardingSubscriptionConnectionPageRoute.path(orgId)}
                    className="btn btn-scordi btn-block"
                    displayLoading={false}
                >
                    구독 불러오기
                </LinkTo>
            }
        />
    );
});
