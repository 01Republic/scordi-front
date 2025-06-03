import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {connectedAssetsAtom} from '../atom';
import {EmptyTable} from '^_components/table/EmptyTable';
import {SuccessCreditCardsSection} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateCompletePage/SuccessCreditCardsSection';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {SuccessBankAccountsSection} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateCompletePage/SuccessBankAccountsSection';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';

export const OrgAssetCreateCompletePage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();

    const connectedAssets = useRecoilValue(connectedAssetsAtom);
    const bankAccounts = connectedAssets.filter((asset) => asset instanceof BankAccountDto) as BankAccountDto[];
    const creditCards = connectedAssets.filter((asset) => asset instanceof CreditCardDto) as CreditCardDto[];

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col gap-20">
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

                {connectedAssets.length === 0 ? (
                    <EmptyTable message="연동된 자산이 없어요" />
                ) : (
                    <div className="flex flex-col gap-10">
                        <SuccessBankAccountsSection bankAccounts={bankAccounts} />
                        <SuccessCreditCardsSection creditCards={creditCards} />
                    </div>
                )}

                <section className="w-full flex items-center justify-center">
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
                </section>
            </PureLayoutContainer>
        </PureLayout>
    );
});

OrgAssetCreateCompletePage.displayName = 'OrgAssetCreateCompletePage';
