import {EmptyTable} from '^_components/table/EmptyTable';
import {useOrgIdParam} from '^atoms/common';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {isDefinedValue} from '^utils/array';
import {useTranslation} from 'next-i18next';
import {memo, ReactNode, useMemo, useState} from 'react';
import {AssetsConnectStepFlashHandler} from '../../../common/AssetsConnectStepFlashHandler';
import {SuccessConnectBankSelector} from '../_component/SuccessConnectBankSelector';
import {SuccessConnectCardSelector} from '../_component/SuccessConnectCardSelector';
import {Searching} from './Searching';
import {StepBackSection} from './StepBackSection';
import {StepCTASection} from './StepCTASection';
import {StepHeaderSection} from './StepHeaderSection';

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
    onReset?: () => any;

    // UI
    title?: ReactNode;
    subTitle?: ReactNode;
    disabledCTAButtonText?: string;
    nextButtonText?: ReactNode;
}

/**
 * 자산 선택p
 */
export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const {t} = useTranslation('assets');
    const orgId = useOrgIdParam();
    const {
        isAfterAccountCreated,
        codefAccounts = [],
        failedCompanies = [],
        onBack,
        onMove,
        onNext,
        onReset,
        title,
        subTitle,
        disabledCTAButtonText,
        nextButtonText,
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

    const codefCardsQuery = useCodefCardsByCompanies(orgId, successCards);
    const codefBankAccountsQuery = useCodefBankAccountsByCompanies(orgId, successBanks);

    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);
    const [selectedCodefBanks, setSelectedCodefBanks] = useState<CodefBankAccountDto[]>([]);

    const disabled = codefBankAccountsQuery.data.length === 0 && codefCardsQuery.data.length === 0;
    const allConnected = codefBankAccountsQuery.allConnected && codefCardsQuery.allConnected;
    const isLoadingMsg = ((): string => {
        if (codefCardsQuery.isLoading) return t('connectSteps.selectAssets.cardLoading');
        if (codefBankAccountsQuery.isLoading) return t('connectSteps.selectAssets.bankLoading');
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
                        <EmptyTable message={t('connectSteps.selectAssets.noConnectedAssets')} />
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
                nextButtonText={nextButtonText}
                isLoading={!!isLoadingMsg}
                allConnected={allConnected}
                notSelected={selectedCodefBanks.length === 0 && selectedCodefCards.length === 0}
                onBack={onBack}
                onReset={onReset}
                onNext={() => onNext(selectedCodefBanks, selectedCodefCards, disabled, allConnected)}
            />
        </PureLayout>
    );
});
