import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {AssetConnectPageTemplate} from '^_components/pages/assets/connect-steps';
import {LinkTo} from '^components/util/LinkTo';
import {useOrgIdParam} from '^atoms/common';
import {OrgAssetsCreateByManualPageRoute} from '^pages/orgs/[id]/assets/new/by-manual';
import {OrgAssetsCreateCompletePageRoute} from '^pages/orgs/[id]/assets/new/complete';
import {useSetRecoilState} from 'recoil';
import {assetConnectedCodefCardsAtom} from '^models/CodefCard/atom';

/**
 * 자산 등록
 */
export const OrgAssetCreateMethodSelectPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setSuccessCodefCards = useSetRecoilState(assetConnectedCodefCardsAtom);

    return (
        <AssetConnectPageTemplate
            ConnectMethodAltActionButton={() => (
                <LinkTo href={OrgAssetsCreateByManualPageRoute.path(orgId)} className="text-14" displayLoading={false}>
                    수동으로 등록하기
                </LinkTo>
            )}
            // onSuccessfullyCreatedByCertificate={(codefCards, bankAccounts) => {
            //     setSuccessCodefCards(codefCards);
            //     // setSuccessBankAccounts(bankAccounts);
            //     router.push(OrgAssetsCreateCompletePageRoute.path(orgId));
            // }}
            onSuccessfullyCreatedByAccount={(codefCards) => {
                setSuccessCodefCards(codefCards);
                router.push(OrgAssetsCreateCompletePageRoute.path(orgId));
            }}
        />
    );
});

OrgAssetCreateMethodSelectPage.displayName = 'OrgAssetCreateMethodSelectPage';
