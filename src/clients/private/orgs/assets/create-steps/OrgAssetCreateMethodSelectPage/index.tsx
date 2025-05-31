import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgAssetsCreateByManualPageRoute} from '^pages/orgs/[id]/assets/new/by-manual';
import {OrgAssetsCreateCompletePageRoute} from '^pages/orgs/[id]/assets/new/complete';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate} from '^_components/pages/assets/connect-steps';
import {connectedAssetsAtom} from '../atom';

/**
 * 자산 등록
 */

export const OrgAssetCreateMethodSelectPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setConnectedAssets = useSetRecoilState(connectedAssetsAtom);

    return (
        <AssetConnectPageTemplate
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgAssetsCreateByManualPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    수동으로 등록하기
                </LinkTo>
            )}
            onSuccess={(connectedAssets) => {
                setConnectedAssets(connectedAssets);
                return router.push(OrgAssetsCreateCompletePageRoute.path(orgId));
            }}
        />
    );
});

OrgAssetCreateMethodSelectPage.displayName = 'OrgAssetCreateMethodSelectPage';
