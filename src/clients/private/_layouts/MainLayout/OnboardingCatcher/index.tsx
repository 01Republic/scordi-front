import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useRouter} from 'next/router';
import {OrgOnboardingSubscriptionPageRoute} from '^pages/orgs/[id]/onboarding/subscription';

export const OnboardingCatcher = memo(function OnboardingCatcher() {
    const router = useRouter();
    const currentOrg = useRecoilValue(currentOrgAtom);

    if (!currentOrg) return <></>;

    if (!currentOrg.onboardingFinishedAt) {
        router.push(OrgOnboardingSubscriptionPageRoute.path(currentOrg.id));
        return <></>;
    }

    return <></>;
});
