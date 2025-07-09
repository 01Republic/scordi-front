import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgAssetsCreateByManualPageRoute} from '^pages/orgs/[id]/assets/new/by-manual';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate, ConnectAssetsStepStrategy} from '^_components/pages/assets/connect-steps';
import {connectedAssetsAtom} from '../atom';
import {BankAccountDto} from '^models/BankAccount/type';
import {toast} from 'react-hot-toast';

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
            assetConnectMethodSelectStep={{
                title: '자산을 연동해 볼까요?',
            }}
            selectAssetsStep={{
                title: '금융기관으로부터 불러온 자산이에요.',
                subTitle: '어떤 자산을 연결할까요?',
                // nextButtonText: '완료',
                nextButtonText: '연결하고 마치기',
            }}
            connectAssetsStep={{
                strategy: ConnectAssetsStepStrategy.CreateScordiAssets,
            }}
            onSuccess={(connectedAssets) => {
                if (connectedAssets.length > 0) toast.success('자산이 추가되었어요.');

                const bankAccountExist = connectedAssets.some((asset) => asset instanceof BankAccountDto);
                // 연동 결과에 카드가 없이 계좌만 있다면,
                if (bankAccountExist) {
                    // 계좌 목록 페이지로 이동하고,
                    return router.replace(OrgBankAccountListPageRoute.path(orgId));
                }

                // 그게 아니면, 기본적으로 카드 목록페이지로 이동.
                return router.push(OrgCreditCardListPageRoute.path(orgId));
            }}
        />
    );
});

OrgAssetCreateMethodSelectPage.displayName = 'OrgAssetCreateMethodSelectPage';
