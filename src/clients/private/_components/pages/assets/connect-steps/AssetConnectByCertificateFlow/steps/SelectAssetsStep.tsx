import React, {memo, ReactNode, useMemo, useState} from 'react';
import {isDefinedValue} from '^utils/array';
import {useOrgIdParam} from '^atoms/common';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {LOTTIE_SRC, LottieNoSSR} from '^components/LottieNoSSR';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';
import {StatusHeader} from '../../common/StatusHeader';
import {NextStepButton} from '../../common/NextStepButton';
import {AssetsConnectStepFlashHandler} from '../../common/AssetsConnectStepFlashHandler';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';
import {SuccessConnectCardSelector} from './_component/SuccessConnectCardSelector';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {LinkTo} from '^components/util/LinkTo';
import {ArrowLeft} from 'lucide-react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {WithLoopText} from '^utils/TypeWritter';

interface SelectAssetsStepProps {
    isAfterAccountCreated: boolean;
    codefAccounts: CodefAccountDto[];
    failedCompanies?: CodefApiAccountItemDto[];
    onBack?: () => any;
    onMove?: () => any;
    onNext: (
        codefBanks: CodefBankAccountDto[],
        codefCards: CodefCardDto[],
        disabled: boolean,
        allConnected: boolean,
    ) => any;

    // UI
    title?: ReactNode;
    subTitle?: ReactNode;
    disabledCTAButtonText?: string;
}

/**
 * 자산 선택p
 */
export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const orgId = useOrgIdParam();
    const {
        isAfterAccountCreated,
        codefAccounts = [],
        failedCompanies = [],
        onBack,
        onMove,
        onNext,
        title,
        subTitle,
        disabledCTAButtonText,
    } = props;

    const [successBanks, successCards] = useMemo(() => {
        const banks = codefAccounts
            .filter((item) => item.isBankCompany)
            .map((item) => BankAccountsStaticData.findOne(item.organization))
            .filter(isDefinedValue);

        const cards = codefAccounts
            .filter((item) => item.isCardCompany)
            .map((item) => CardAccountsStaticData.findOne(item.organization))
            .filter(isDefinedValue);

        return [banks, cards];
    }, [codefAccounts]);

    const codefBankAccountsQuery = useCodefBankAccountsByCompanies(orgId, successBanks);
    const codefCardsQuery = useCodefCardsByCompanies(orgId, successCards);

    const [selectedCodefBanks, setSelectedCodefBanks] = useState<CodefBankAccountDto[]>([]);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);

    const notSelected = selectedCodefBanks.length === 0 && selectedCodefCards.length === 0;
    // const disabled = codefAccounts.length === 0;
    const disabled = codefBankAccountsQuery.data.length === 0 && codefCardsQuery.data.length === 0;
    const isLoadingMsg = ((): string => {
        if (codefCardsQuery.isLoading) return '카드 정보 조회중';
        if (codefBankAccountsQuery.isLoading) return '계좌 정보 조회중';
        return '';
    })();
    const allConnected = codefBankAccountsQuery.allConnected && codefCardsQuery.allConnected;

    return (
        <PureLayout className="py-14">
            <PureLayoutContainerSection className="mb-12">
                <div>
                    <LinkTo
                        className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                        onClick={onBack}
                        displayLoading={false}
                    >
                        <ArrowLeft />
                        뒤로가기
                    </LinkTo>
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="mb-16 max-w-full sticky top-0 pt-8 pb-4 px-0 bg-layout-background z-10">
                <div className="mx-auto max-w-6xl flex flex-col gap-10 px-4">
                    <StatusHeader
                        title={(() => {
                            if (isLoadingMsg) return <WithLoopText text={isLoadingMsg} />;

                            if (isAfterAccountCreated) {
                                // 방금 등록하고 넘어온 경우
                                return disabled
                                    ? '선택하신 금융기관에서는 자산을 조회하지 못했어요 💦'
                                    : '자산 연동이 완료되었어요';
                            } else {
                                // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                                return allConnected
                                    ? '조회된 모든 자산이 이미 연결되어있네요!'
                                    : title ?? '어떤 자산으로부터 구독을 불러올까요?';
                            }
                        })()}
                        subTitle={(() => {
                            if (isLoadingMsg) return '';

                            if (isAfterAccountCreated) {
                                // 방금 등록하고 넘어온 경우
                                return disabled ? '' : '어떤 자산으로부터 구독을 불러올까요?';
                            } else {
                                // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                                return allConnected
                                    ? '자산 추가를 클릭해 더 많은 연결수단을 등록 할 수 있어요.'
                                    : subTitle ??
                                          '개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요.';
                            }
                        })()}
                        icon={(() => {
                            const empty = <div className="w-0 h-24 -mr-1">&nbsp;</div>;
                            if (isLoadingMsg) return undefined;

                            if (isAfterAccountCreated) {
                                // 방금 등록하고 넘어온 경우
                                return disabled ? undefined : (
                                    <LottieNoSSR
                                        src={LOTTIE_SRC.CLAP}
                                        loop
                                        autoplay
                                        className={`w-[82px] h-24`}
                                        layout={{fit: 'fill'}}
                                    />
                                );
                            } else {
                                // 이미 연결된게 있어서 다이렉트로 넘어온 경우
                                return allConnected ? undefined : undefined;
                            }
                        })()}
                        onMove={isAfterAccountCreated ? undefined : onMove}
                    />
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="flex flex-col gap-20 mb-20">
                {failedCompanies.length > 0 && <AssetsConnectStepFlashHandler failures={failedCompanies} />}

                {disabled ? (
                    isLoadingMsg ? (
                        <EmptyTable
                            className="py-0"
                            Icon={() => (
                                <DotLottieReact
                                    src={LOTTIE_SRC.LOADING_SEARCHING}
                                    loop
                                    autoplay
                                    className="h-40 -mb-4"
                                />
                            )}
                            message={isLoadingMsg || '계좌 정보 조회중'}
                        />
                    ) : (
                        <EmptyTable message="연동된 자산이 없어요" />
                    )
                ) : (
                    <>
                        {codefBankAccountsQuery.data.length > 0 && (
                            <SuccessConnectBankSelector
                                codefBankAccounts={codefBankAccountsQuery.data}
                                isLoading={codefBankAccountsQuery.isLoading}
                                onSelect={setSelectedCodefBanks}
                            />
                        )}

                        {codefCardsQuery.data.length > 0 && (
                            <SuccessConnectCardSelector
                                codefCards={codefCardsQuery.data}
                                isLoading={codefCardsQuery.isLoading}
                                onSelect={setSelectedCodefCards}
                            />
                        )}
                    </>
                )}
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="max-w-full sticky bottom-0 py-4 bg-layout-background flex items-center justify-center">
                {isLoadingMsg ? (
                    <NextStepButton text="불러오는중" disabled />
                ) : allConnected ? (
                    <NextStepButton text="처음으로" onClick={onBack} />
                ) : (
                    <NextStepButton
                        // 선택된 항목 유무에 따라 결정
                        disabled={notSelected}
                        onClick={() => onNext(selectedCodefBanks, selectedCodefCards, disabled, allConnected)}
                        text={(() => {
                            if (disabled) return disabledCTAButtonText || '완료';
                            return '다음';
                        })()}
                    />
                )}
            </PureLayoutContainerSection>
        </PureLayout>
    );
});
