import React, {memo, ReactNode, useMemo, useState} from 'react';
import {Transition} from '@headlessui/react';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {useOrgIdParam} from '^atoms/common';
import {isDefinedValue} from '^utils/array';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {EmptyTable} from '^_components/table/EmptyTable';
import {NextStepButton} from '../../../common/NextStepButton';
import {AssetsConnectStepFlashHandler} from '../../../common/AssetsConnectStepFlashHandler';
import {SuccessConnectCardSelector} from '../_component/SuccessConnectCardSelector';
import {SuccessConnectBankSelector} from '../_component/SuccessConnectBankSelector';
import {StepHeaderSection} from './StepHeaderSection';
import {StepBackSection} from './StepBackSection';
import {StepCTASection} from '^_components/pages/assets/connect-steps/AssetConnectByCertificateFlow/steps/SelectAssetsStep/StepCTASection';
import {Searching} from '^_components/pages/assets/connect-steps/AssetConnectByCertificateFlow/steps/SelectAssetsStep/Searching';

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

    const disabled = codefBankAccountsQuery.data.length === 0 && codefCardsQuery.data.length === 0;
    const allConnected = codefBankAccountsQuery.allConnected && codefCardsQuery.allConnected;
    const isLoadingMsg = ((): string => {
        if (codefCardsQuery.isLoading) return '카드 정보 조회중';
        if (codefBankAccountsQuery.isLoading) return '계좌 정보 조회중';
        return '';
    })();

    return (
        <PureLayout className="py-14">
            <StepBackSection onBack={onBack} />

            <StepHeaderSection
                isAfterAccountCreated={isAfterAccountCreated}
                onMove={onMove}
                isLoadingMsg={isLoadingMsg}
                disabled={disabled}
                allConnected={allConnected}
                title={title}
                subTitle={subTitle}
            />

            <PureLayoutContainerSection className="flex flex-col gap-20 mb-20">
                {failedCompanies.length > 0 && <AssetsConnectStepFlashHandler failures={failedCompanies} />}

                {disabled ? (
                    isLoadingMsg ? (
                        <Searching isLoadingMsg={isLoadingMsg} />
                    ) : (
                        <EmptyTable message="연동된 자산이 없어요" />
                    )
                ) : (
                    <>
                        {codefCardsQuery.data.length > 0 && (
                            <SuccessConnectCardSelector
                                codefCards={codefCardsQuery.data}
                                isLoading={codefCardsQuery.isLoading}
                                onSelect={setSelectedCodefCards}
                            />
                        )}

                        {codefBankAccountsQuery.data.length > 0 && (
                            <SuccessConnectBankSelector
                                codefBankAccounts={codefBankAccountsQuery.data}
                                isLoading={codefBankAccountsQuery.isLoading}
                                onSelect={setSelectedCodefBanks}
                            />
                        )}
                    </>
                )}
            </PureLayoutContainerSection>

            <StepCTASection
                disabled={disabled}
                disabledCTAButtonText={disabledCTAButtonText}
                isLoading={!!isLoadingMsg}
                allConnected={allConnected}
                notSelected={selectedCodefBanks.length === 0 && selectedCodefCards.length === 0}
                onBack={onBack}
                onNext={() => onNext(selectedCodefBanks, selectedCodefCards, disabled, allConnected)}
            />
        </PureLayout>
    );
});
