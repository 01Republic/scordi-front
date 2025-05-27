import {memo, useContext, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {SelectCompaniesStep} from './steps/SelectCompaniesStep';
import {CreateAccountsStep} from './steps/CreateAccountsStep';
import {SelectAssetsStep} from './steps/SelectAssetsStep';
import {ConnectAssetsStep} from './steps/ConnectAssetsStep';
import {AssetConnectOptionContext, EntryPath} from '^_components/pages/assets/connect-steps';
import {useRouter} from 'next/router';

enum ConnectByCertificateStep {
    SelectCompaniesStep,
    CreateAccountsStep,
    SelectAssetsStep,
    ConnectAssetsStep,
    connectSuccessSubscriptionStep,
}

export const AssetConnectByCertificateStep = memo(() => {
    const [step, setStep] = useState<ConnectByCertificateStep>(ConnectByCertificateStep.SelectCompaniesStep);
    const [selectedBankCompanies, setSelectedBankCompanies] = useState<BankAccountsStaticData[]>([]);
    const [selectedCardCompanies, setSelectedCardCompanies] = useState<CardAccountsStaticData[]>([]);

    const [selectedCodefBanks, setSelectedCodefBanks] = useState<CodefBankAccountDto[]>([]);
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);

    return (
        <>
            {/* 연동할 자산 선택 및 공동인증서 로그인 */}
            {step === ConnectByCertificateStep.SelectCompaniesStep && (
                <SelectCompaniesStep
                    selectedBankCompanies={selectedBankCompanies}
                    setSelectedBankCompanies={setSelectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    setSelectedCardCompanies={setSelectedCardCompanies}
                    onNext={() => setStep(ConnectByCertificateStep.CreateAccountsStep)}
                />
            )}

            {/* 공동인증서와 함께 선택한 자산을 codef 계정 등록 (+ 자산 연동 요청) */}
            {step === ConnectByCertificateStep.CreateAccountsStep && (
                <CreateAccountsStep
                    selectedBankCompanies={selectedBankCompanies}
                    selectedCardCompanies={selectedCardCompanies}
                    onNext={() => setStep(ConnectByCertificateStep.SelectAssetsStep)}
                />
            )}

            {/* 자산 연동이 완료된 자산 목록을 보여주고 스코디 자산으로 연동할 자산을 선택 */}
            {step === ConnectByCertificateStep.SelectAssetsStep && (
                <SelectAssetsStep
                    bankCompanies={selectedBankCompanies}
                    cardCompanies={selectedCardCompanies}
                    selectedCodefBanks={selectedCodefBanks}
                    setSelectedCodefBanks={setSelectedCodefBanks}
                    selectedCodefCards={selectedCodefCards}
                    setSelectedCodefCards={setSelectedCodefCards}
                    onBack={() => setStep(ConnectByCertificateStep.SelectCompaniesStep)}
                    onNext={() => setStep(ConnectByCertificateStep.ConnectAssetsStep)}
                />
            )}

            {/* 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김 */}
            {step === ConnectByCertificateStep.ConnectAssetsStep && (
                <ConnectAssetsStep
                    selectedCodefBanks={selectedCodefBanks}
                    selectedCodefCards={selectedCodefCards}
                    onNext={() => setStep(ConnectByCertificateStep.connectSuccessSubscriptionStep)}
                />
            )}
        </>
    );
});
