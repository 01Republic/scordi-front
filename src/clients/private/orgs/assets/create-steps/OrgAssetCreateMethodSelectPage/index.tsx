import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgAssetsCreateByManualPageRoute} from '^pages/orgs/[id]/assets/new/by-manual';
import {OrgAssetsCreateCompletePageRoute} from '^pages/orgs/[id]/assets/new/complete';
import {assetConnectedCodefBanksAtom, assetConnectedCodefCardsAtom} from '^models/CodefCard/atom';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate, EntryPath} from '^_components/pages/assets/connect-steps';

/**
 * 자산 등록
 */

export const OrgAssetCreateMethodSelectPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setSuccessCodefCards = useSetRecoilState(assetConnectedCodefCardsAtom);
    const setSuccessCodefBanks = useSetRecoilState(assetConnectedCodefBanksAtom);

    return (
        <AssetConnectPageTemplate
            entryPath={EntryPath.Asset}
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgAssetsCreateByManualPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    수동으로 등록하기
                </LinkTo>
            )}
            onSuccessfullyCreatedByAccount={(codefCards) => {
                setSuccessCodefCards(codefCards || []);
                router.push(OrgAssetsCreateCompletePageRoute.path(orgId));
            }}
        />
    );
});

OrgAssetCreateMethodSelectPage.displayName = 'OrgAssetCreateMethodSelectPage';
