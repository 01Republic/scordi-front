import {memo, useContext, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {AccountConnectStep} from './steps/AccountConnectStep';
import {AccountConnectLoadingStep} from './steps/AccountConnectLoadingStep';
import {ConnectSuccessAssetSelectStep} from './steps/ConnectSuccessAssetSelectStep';
import {SelectAssetConnectLoadingStep} from './steps/SelectAssetConnectLoadingStep';
import {AssetConnectOptionContext, EntryPath} from '^_components/pages/assets/connect-steps';
import {useRouter} from 'next/router';

enum ConnectByCertificateStep {
    accountConnectStep,
    accountConnectLoadingStep,
    connectSuccessAssetSelectStep,
    selectAssetConnectLoadingStep,
    connectSuccessSubscriptionStep,
}

export const AssetConnectByCertificateStep = memo(() => {
    const {entryPath, onSuccessfullyCreateByCertificate} = useContext(AssetConnectOptionContext);
    const router = useRouter();
    const [step, setStep] = useState<ConnectByCertificateStep>(ConnectByCertificateStep.accountConnectStep);
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
            {step === ConnectByCertificateStep.accountConnectStep && (
                <AccountConnectStep
                    selectedBankCompanies={selectedBankCompanies}
                    setSelectedBankCompanies={setSelectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    setSelectedCardCompanies={setSelectedCardCompanies}
                    onNext={() => setStep(ConnectByCertificateStep.accountConnectLoadingStep)}
                />
            )}

            {/* 공동인증서와 함께 선택한 자산을 codef 계정 등록 (+ 자산 연동 요청)*/}
            {step === ConnectByCertificateStep.accountConnectLoadingStep && (
                <AccountConnectLoadingStep
                    selectedBankCompanies={selectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    setBankResults={setBankResults}
                    setCardResults={setCardResults}
                    onNext={() => setStep(ConnectByCertificateStep.connectSuccessAssetSelectStep)}
                />
            )}

            {/* 자산 연동이 완료된 자산 목록을 보여주고 스코디 자산으로 연동할 자산을 선택 */}
            {step === ConnectByCertificateStep.connectSuccessAssetSelectStep && (
                <ConnectSuccessAssetSelectStep
                    bankResults={bankResults}
                    cardResults={cardResults}
                    selectedCodefBanks={selectedCodefBanks}
                    setSelectedCodefBanks={setSelectedCodefBanks}
                    selectedCodefCards={selectedCodefCards}
                    setSelectedCodefCards={setSelectedCodefCards}
                    onBack={() => setStep(ConnectByCertificateStep.accountConnectStep)}
                    onNext={() => setStep(ConnectByCertificateStep.selectAssetConnectLoadingStep)}
                />
            )}

            {/* 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김 */}
            {step === ConnectByCertificateStep.selectAssetConnectLoadingStep && (
                <SelectAssetConnectLoadingStep
                    selectedCodefBanks={selectedCodefBanks}
                    selectedCodefCards={selectedCodefCards}
                    onNext={() => setStep(ConnectByCertificateStep.connectSuccessSubscriptionStep)}
                />
            )}
        </>
    );
});
