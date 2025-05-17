import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import { LinkTo } from '^components/util/LinkTo';
import {OnboadingLayout} from '^clients/private/orgs/onboarding/OnboadingLayout';
import {OrgOnboardingCompletePageRoute} from '^pages/orgs/[id]/onboarding/complete';
import {OrgOnboardingRequestNewPageRoute} from '^pages/orgs/[id]/onboarding/request/new';

export const OrgOnboardingRequestPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <OnboadingLayout
            step={3}
            title={`구성원에게 이용 중인\n구독을 조사해요`}
            description={`실사용 여부를 파악해서 \n쓰지 않는 구독을 정리해요`}
            image="/images/examples/ex_request.png"
            onSkip={() => router.push(OrgOnboardingCompletePageRoute.path(orgId))}
            button={
                <div className="flex flex-col gap-4">
                    <LinkTo
                        href={OrgOnboardingRequestNewPageRoute.path(orgId)}
                        className="btn btn-lg btn-scordi w-full"
                    >
                        설문 요청하기
                    </LinkTo>
                </div>
            }
        />
    );
});
