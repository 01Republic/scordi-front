import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate, ConnectAssetsStepStrategy} from '^_components/pages/assets/connect-steps';
import {connectedAssetsAtom} from '^clients/private/orgs/subscriptions/connection-steps/atom';
import {OrgOnboardingSubscriptionConnectionCompletePageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection/complete';
import {OrgOnboardingSubscriptionConnectionManualSelectPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection/manual/select';
import {OrgOnboardingMembersPageRoute} from '^pages/orgs/[id]/onboarding/members';

// 온보딩 스텝1. / 구독 불러오기 / 시작 페이지
export const OrgSubscriptionConnectionPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setConnectedAssets = useSetRecoilState(connectedAssetsAtom);

    return (
        <AssetConnectPageTemplate
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgOnboardingMembersPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    Skip
                </LinkTo>
            )}
            onSuccess={(connectedAssets) => {
                setConnectedAssets(connectedAssets);
                return router.replace(OrgOnboardingSubscriptionConnectionCompletePageRoute.path(orgId));
            }}
            assetConnectMethodSelectStep={{
                title: '구독을 불러올까요?',
                subTitle: '공동인증서를 연동하면 금융자산으로부터 한번에 구독을 불러올 수 있어요.',
            }}
            selectAssetsStep={{
                title: '어떤 자산으로부터 구독을 불러올까요?',
                subTitle: '',
                nextButtonText: '다음',
            }}
            connectAssetsStep={{
                strategy: ConnectAssetsStepStrategy.SyncSubscriptions,
            }}
        />
    );
});
