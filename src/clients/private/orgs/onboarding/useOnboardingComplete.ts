import {useEffect, useState} from 'react';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {organizationApi} from '^models/Organization/api';
import {errorToast} from '^api/api';
import {useCurrentOrg} from '^models/Organization/hook';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';

export const useOnboardingComplete = () => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {currentOrg, reload} = useCurrentOrg(orgId);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (!currentOrg) return;
        if (isUpdated) return;
        if (currentOrg.onboardingFinishedAt) {
            confirm('이미 온보딩을 모두 진행하셨습니다!');
            router.push(OrgMainPageRoute.path(orgId));
        }
    }, [isUpdated, currentOrg]);

    const onComplete = () => {
        setIsLoading(true);
        organizationApi
            .update(orgId, {onboardingFinishedAt: new Date()})
            .then((res) => res.data)
            .then(() => setIsUpdated(true))
            .then(() => reload())
            .then(() => router.push(OrgMainPageRoute.path(orgId, {confetti: 'true'})))
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return {
        isLoading,
        onComplete,
    };
};
