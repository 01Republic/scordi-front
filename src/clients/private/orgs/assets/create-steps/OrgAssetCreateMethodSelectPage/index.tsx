import {AssetConnectPageTemplate, ConnectAssetsStepStrategy} from '^_components/pages/assets/connect-steps';
import {useOrgIdParam} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {BankAccountDto} from '^models/BankAccount/type';
import {OrgAssetsCreateByManualPageRoute} from '^pages/orgs/[id]/assets/new/by-manual';
import {OrgBankAccountListPageRoute} from '^pages/orgs/[id]/bankAccounts';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {useSetRecoilState} from 'recoil';
import {connectedAssetsAtom} from '../atom';

/**
 * 자산 등록
 */
export const OrgAssetCreateMethodSelectPage = memo(() => {
    const {t} = useTranslation('assets');
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
                    {t('createSteps.manualRegister') as string}
                </LinkTo>
            )}
            assetConnectMethodSelectStep={{
                title: t('createSteps.connectMethod.title') as string,
            }}
            selectAssetsStep={{
                title: t('createSteps.selectAssets.title') as string,
                subTitle: t('createSteps.selectAssets.subTitle') as string,
                // nextButtonText: '완료',
                nextButtonText: t('createSteps.selectAssets.nextButtonText') as string,
            }}
            connectAssetsStep={{
                strategy: ConnectAssetsStepStrategy.CreateScordiAssets,
            }}
            onSuccess={(connectedAssets) => {
                if (connectedAssets.length > 0) toast.success(t('createSteps.messages.success') as string);

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
