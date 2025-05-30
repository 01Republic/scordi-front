import React, {memo, useMemo, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {AssetsConnectStepFlashHandler} from '^_components/pages/assets/connect-steps/common/AssetsConnectStepFlashHandler';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';
import {SuccessConnectCardSelector} from './_component/SuccessConnectCardSelector';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {EmptyTable} from '^_components/table/EmptyTable';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {isDefinedValue} from '^utils/array';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';

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
    disabledCTAButtonText?: string;
}

/**
 * 자산 선택p
 */
export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {
        isAfterAccountCreated,
        codefAccounts = [],
        failedCompanies = [],
        onBack,
        onMove,
        onNext,
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
    const disabled = codefAccounts.length === 0;
    const isLoadingMsg = ((): string => {
        if (codefCardsQuery.isLoading) return '카드 정보 조회중';
        if (codefBankAccountsQuery.isLoading) return '계좌 정보 조회중';
        return '';
    })();
    const allConnected = codefBankAccountsQuery.allConnected && codefCardsQuery.allConnected;

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title={
                        isLoadingMsg
                            ? isLoadingMsg
                            : isAfterAccountCreated
                            ? disabled
                                ? '선택하신 금융기관에서는 자산을 조회하지 못했어요 💦'
                                : '자산 연동이 완료되었어요'
                            : allConnected
                            ? '조회된 모든 자산이 이미 연결되어있네요!'
                            : '어떤 자산으로부터 구독을 불러올까요?'
                    }
                    subTitle={
                        isLoadingMsg
                            ? '잠시만 기다려 주세요'
                            : isAfterAccountCreated
                            ? disabled
                                ? ''
                                : '어떤 자산으로부터 구독을 불러올까요?'
                            : allConnected
                            ? '자산 추가를 클릭해 더 많은 연결수단을 등록 할 수 있어요.'
                            : '개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요.'
                    }
                    icon={
                        isAfterAccountCreated ? (
                            disabled ? (
                                <div className="w-0 h-24 -mr-1">&nbsp;</div>
                            ) : (
                                <LottieNoSSR
                                    src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                                    loop
                                    autoplay
                                    className={`w-[82px] h-24`}
                                    layout={{fit: 'fill'}}
                                />
                            )
                        ) : undefined
                    }
                    onBack={onBack}
                    onMove={isAfterAccountCreated ? undefined : onMove}
                />

                {failedCompanies.length > 0 && <AssetsConnectStepFlashHandler failures={failedCompanies} />}

                {disabled ? (
                    <EmptyTable message="연동된 자산이 없어요" />
                ) : (
                    <>
                        {successBanks.length > 0 && (
                            <SuccessConnectBankSelector
                                codefBankAccounts={codefBankAccountsQuery.data}
                                isLoading={codefBankAccountsQuery.isLoading}
                                onSelect={setSelectedCodefBanks}
                            />
                        )}

                        {successCards.length > 0 && (
                            <SuccessConnectCardSelector
                                codefCards={codefCardsQuery.data}
                                isLoading={codefCardsQuery.isLoading}
                                onSelect={setSelectedCodefCards}
                            />
                        )}
                    </>
                )}

                <div className="flex w-full justify-center">
                    <NextStepButton
                        disabled={!!isLoadingMsg || notSelected}
                        onClick={() => onNext(selectedCodefBanks, selectedCodefCards, disabled, allConnected)}
                        text={(() => {
                            if (isLoadingMsg) return '불러오는중';
                            if (allConnected) return disabledCTAButtonText || '완료';
                            if (disabled) return disabledCTAButtonText || '완료';
                            return '다음';
                        })()}
                    />
                </div>
            </div>
        </PureLayout>
    );
});
