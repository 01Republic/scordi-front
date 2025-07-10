import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {AssetConnectSuccessPageTemplate} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate';
import {OrgOnboardingMembersPageRoute} from '^pages/orgs/[id]/onboarding/members';
import {connectedAssetsAtom} from '^clients/private/orgs/subscriptions/connection-steps/atom';

/** 온보딩 스텝1. / 구독 불러오기 / 완료 페이지 */
export const CompleteSubscriptionConnectionPage = memo(function CompleteSubscriptionConnectionPage() {
    const router = useRouter();
    const orgId = useOrgIdParam();

    const connectedAssets = useRecoilValue(connectedAssetsAtom);

    return (
        <AssetConnectSuccessPageTemplate
            assets={connectedAssets}
            onNext={() => router.push(OrgOnboardingMembersPageRoute.path(orgId))}
        />
    );
});
