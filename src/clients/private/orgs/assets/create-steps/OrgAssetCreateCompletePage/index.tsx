import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {EmptyTable} from '^_components/table/EmptyTable';
import {useOrgIdParam} from '^atoms/common';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {SuccessBankAccountsSection} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateCompletePage/SuccessBankAccountsSection';
import {SuccessCreditCardsSection} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateCompletePage/SuccessCreditCardsSection';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {BankAccountDto} from '^models/BankAccount/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {OrgCreditCardListPageRoute} from '^pages/orgs/[id]/creditCards';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {connectedAssetsAtom} from '../atom';

/** DEPRECATED PAGE */
export const OrgAssetCreateCompletePage = memo(() => {
    const {t} = useTranslation('assets');
    const router = useRouter();
    const orgId = useOrgIdParam();

    const connectedAssets = useRecoilValue(connectedAssetsAtom);
    const bankAccounts = connectedAssets.filter((asset) => asset instanceof BankAccountDto) as BankAccountDto[];
    const creditCards = connectedAssets.filter((asset) => asset instanceof CreditCardDto) as CreditCardDto[];

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col gap-20">
                <StatusHeader
                    title={t('createSteps.complete.title') as string}
                    icon={
                        <Lottie src={LOTTIE_SRC.CLAP} loop autoplay className="w-[82px] h-24" layout={{fit: 'fill'}} />
                    }
                    onBack={() => router.back()}
                />

                {connectedAssets.length === 0 ? (
                    <EmptyTable message={t('createSteps.complete.noAssets') as string} />
                ) : (
                    <div className="flex flex-col gap-10">
                        <SuccessCreditCardsSection creditCards={creditCards} />
                        <SuccessBankAccountsSection bankAccounts={bankAccounts} />
                    </div>
                )}

                <section className="w-full flex items-center justify-center">
                    <NextStepButton
                        onClick={() => {
                            // 연동 결과에 카드가 없이 계좌만 있다면,
                            // if () {
                            //     // 계좌 목록 페이지로 이동하고,
                            //     return router.replace(OrgBankAccountListPageRoute.path(orgId));
                            // }
                            //
                            // 그게 아니면, 기본적으로 카드 목록페이지로 이동.
                            return router.replace(OrgCreditCardListPageRoute.path(orgId));
                        }}
                    />
                </section>
            </PureLayoutContainer>
        </PureLayout>
    );
});

OrgAssetCreateCompletePage.displayName = 'OrgAssetCreateCompletePage';
