import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate} from '^_components/pages/assets/connect-steps';
import {connectedAssetsAtom} from '^clients/private/orgs/subscriptions/connection-steps/atom';
import {OrgOnboardingSubscriptionConnectionCompletePageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection/complete';

/**
 * 구독 등록
 */
export const OrgSubscriptionConnectionPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setConnectedAssets = useSetRecoilState(connectedAssetsAtom);

    return (
        <AssetConnectPageTemplate
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgSubscriptionSelectPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    수동으로 등록하기
                </LinkTo>
            )}
            onSuccess={(connectedAssets) => {
                setConnectedAssets(connectedAssets);
                return router.replace(OrgOnboardingSubscriptionConnectionCompletePageRoute.path(orgId));
            }}
            selectAssetsStep={{
                title: '어떤 자산으로부터 구독을 불러올까요?',
                subTitle: '',
            }}
        />
    );
});
