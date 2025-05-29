import {memo, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {SelectCompaniesStep} from './steps/SelectCompaniesStep';
import {CreateAccountsStep} from './steps/CreateAccountsStep';
import {SelectAssetsStep} from './steps/SelectAssetsStep';
import {ConnectAssetsStep} from './steps/ConnectAssetsStep';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useOrgIdParam} from '^atoms/common';
import {useRouter} from 'next/router';

enum ConnectByCertificateStep {
    SelectCompaniesStep,
    CreateAccountsStep,
    SelectAssetsStep,
    ConnectAssetsStep,
    connectSuccessSubscriptionStep,
}

/** 공동인증서로 자산 불러오기 Flow */
export const AssetConnectByCertificateFlow = memo(() => {
    const orgId = useOrgIdParam();
    const router = useRouter();
    const [step, setStep] = useState<ConnectByCertificateStep>(ConnectByCertificateStep.SelectCompaniesStep);
    const [selectedCompanies, setSelectedCompanies] = useState<CodefCompanyStaticData[]>([]);
    const [selectedCodefAssets, setSelectedCodefAssets] = useState<(CodefBankAccountDto | CodefCardDto)[]>([]);

    return (
        <>
            {/* 연동할 자산 선택 및 공동인증서 로그인 */}
            {step === ConnectByCertificateStep.SelectCompaniesStep && (
                <SelectCompaniesStep
                    onNext={(companies) => {
                        setSelectedCompanies(companies);
                        setStep(ConnectByCertificateStep.CreateAccountsStep);
                    }}
                />
            )}

            {/* 공동인증서와 함께 선택한 자산을 codef 계정 등록 (+ 자산 연동 요청) */}
            {step === ConnectByCertificateStep.CreateAccountsStep && (
                <CreateAccountsStep
                    companies={selectedCompanies}
                    onNext={(queryResults) => {
                        // queryResults
                        setStep(ConnectByCertificateStep.SelectAssetsStep);
                    }}
                />
            )}

            {/* 자산 연동이 완료된 자산 목록을 보여주고 스코디 자산으로 연동할 자산을 선택 */}
            {step === ConnectByCertificateStep.SelectAssetsStep && (
                <SelectAssetsStep
                    companies={selectedCompanies}
                    onBack={() => setStep(ConnectByCertificateStep.SelectCompaniesStep)}
                    onNext={(codefBanks, codefCards, disabled) => {
                        if (disabled) {
                            return router.replace(OrgMainPageRoute.path(orgId));
                        }
                        setSelectedCodefAssets([...codefBanks, ...codefCards]);
                        setStep(ConnectByCertificateStep.ConnectAssetsStep);
                    }}
                    disabledCTAButtonText="홈으로"
                />
            )}

            {/* 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김 */}
            {step === ConnectByCertificateStep.ConnectAssetsStep && (
                <ConnectAssetsStep
                    codefAssets={selectedCodefAssets}
                    onNext={(results) => {
                        console.log('results', results);
                        alert(results.length + ' assets are connected');
                    }}
                />
            )}
        </>
    );
});
