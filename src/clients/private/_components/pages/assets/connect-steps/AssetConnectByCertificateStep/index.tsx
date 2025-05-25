import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useOrgIdParam} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {AccountConnectStep} from './steps/AccountConnectStep';
import {AccountConnectLoadingStep} from './steps/AccountConnectLoadingStep';
import {ConnectSuccessAssetSelectStep} from './steps/ConnectSuccessAssetSelectStep';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';

enum AccountStep {
    accountConnectStep,
    accountConnectLoadingStep,
    connectSuccessAssetSelectStep,
    selectAssetConnectLoadingStep,
    connectSubscription,
    success,
}

export const AssetConnectByCertificateStep = memo(() => {
    const form = useFormContext<CreateAccountRequestDto>();
    const [step, setStep] = useState<AccountStep>(AccountStep.accountConnectStep);

    const orgId = useOrgIdParam();
    const [selectedBankCompanies, setSelectedBankCompanies] = useState<BankAccountsStaticData[]>([]);
    const [selectedCardCompanies, setSelectedCardCompanies] = useState<CardAccountsStaticData[]>([]);

    const [bankResults, setBankResults] = useState<CreateCodefBankAssets>({
        successes: [],
        failures: [],
    });
    const [cardResults, setCardResults] = useState<CreateCodefCardAssets>({
        successes: [],
        failures: [],
    });
    const [selectedCodefBanks, setSelectedCodefBanks] = useState<CodefBankAccountDto[]>([]);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);

    return (
        <>
            {/* 연동할 자산 선택 및 공동인증서 로그인*/}
            {step === AccountStep.accountConnectStep && (
                <AccountConnectStep
                    selectedBankCompanies={selectedBankCompanies}
                    setSelectedBankCompanies={setSelectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    setSelectedCardCompanies={setSelectedCardCompanies}
                    setStep={() => setStep(AccountStep.accountConnectLoadingStep)}
                />
            )}

            {/* 연동인증서 연동 완료 토큰으로 연동이 완료된 자산으로 스코디 자산 생성 요청 */}
            {step === AccountStep.accountConnectLoadingStep && (
                <AccountConnectLoadingStep
                    selectedBankCompanies={selectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    setBankResults={setBankResults}
                    setCardResults={setCardResults}
                    setStep={() => setStep(AccountStep.connectSuccessAssetSelectStep)}
                />
            )}

            {/* 연동인증서 연동 완료 토큰으로 연동이 완료된 자산으로 스코디 자산 생성 요청 */}
            {step === AccountStep.connectSuccessAssetSelectStep && (
                <ConnectSuccessAssetSelectStep
                    bankResults={bankResults}
                    cardResults={cardResults}
                    selectedCodefBanks={selectedCodefBanks}
                    setSelectedCodefBanks={setSelectedCodefBanks}
                    onBack={() => setStep(AccountStep.accountConnectStep)}
                    setStep={() => setStep(AccountStep.selectAssetConnectLoadingStep)}
                />
            )}
        </>
    );
});
