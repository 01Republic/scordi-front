import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {assetConnectedCodefCardsAtom} from '^models/CodefCard/atom';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {SuccessCreditCardSection} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/SuccessCreditCardSection';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';

export const OrgAssetCreateCompletePage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const processedCodefCards = useRecoilValue(assetConnectedCodefCardsAtom);

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title="자산 연동이 완료되었어요"
                    icon={
                        <LottieNoSSR
                            src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />
                    }
                    onBack={() => router.back()}
                />
                {processedCodefCards.length > 0 && (
                    <SuccessCreditCardSection processedCodefCards={processedCodefCards} />
                )}
                <div className="flex w-full justify-center">
                    <NextStepButton
                        onClick={() => {
                            // 연동 결과에 카드가 없이 계좌만 있다면,
                            // if () {
                            //     // 계좌 목록 페이지로 이동하고,
                            //     return router.push(OrgBankAccountListPageRoute.path(orgId));
                            // }
                            //
                            // 그게 아니면, 기본적으로 카드 목록페이지로 이동.
                            return router.push(OrgCreditCardListPageRoute.path(orgId));
                        }}
                    />
                </div>
            </div>
        </PureLayout>
    );
});

OrgAssetCreateCompletePage.displayName = 'OrgAssetCreateCompletePage';
