import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {OrgSubscriptionConnectionSuccessPageRoute} from '^pages/orgs/[id]/subscriptions/connection/success';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate, ConnectAssetsStepStrategy} from '^_components/pages/assets/connect-steps';
import {connectedAssetsAtom} from '../atom';

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
                return router.replace(OrgSubscriptionConnectionSuccessPageRoute.path(orgId));
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
