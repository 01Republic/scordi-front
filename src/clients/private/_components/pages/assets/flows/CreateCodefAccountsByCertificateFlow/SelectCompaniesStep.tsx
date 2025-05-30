import {memo, useState} from 'react';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {BusinessTypeSelector} from '^_components/pages/assets/connect-steps/common/BusinessTypeSelector';
import {BankCompaniesSelector} from '^_components/pages/assets/connect-steps/common/BankCompaniesSelector';
import {CardCompaniesSelector} from '^_components/pages/assets/connect-steps/common/CardCompaniesSelector';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {codefCertificate} from '^lib/codef/certificate/main';
import {JsonpError} from '^lib/codef/certificate/utils/jsonp';
import {InstallCheckErrorCode} from '^lib/codef/certificate/main/errors';
import {InstallCertProgramModal, CertificateSignModal} from '^lib/codef/certificate/components';
import {CodefCertificateType} from '^models/CodefAccount/type/enums';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';

interface SelectCompaniesStepProps {
    onBack: () => any;
    onNext: (companies: CodefCompanyStaticData[]) => any;
}

/** 연동할 자산 선택 및 공동인증서 로그인 */
export const SelectCompaniesStep = memo((props: SelectCompaniesStepProps) => {
    const {onBack, onNext} = props;
    const [selectedBankCompanies, setSelectedBankCompanies] = useState<BankAccountsStaticData[]>([]);
    const [selectedCardCompanies, setSelectedCardCompanies] = useState<CardAccountsStaticData[]>([]);

    const form = useFormContext<CreateAccountRequestDto>();
    const [isCertificateLinkModalOpen, setCertificateLinkModalOpen] = useState(false);
    const [isInstallCertProgramModalOpened, setIsInstallCertProgramModalOpened] = useState(false);
    const [isLoadingEngine, setIsLoadingEngine] = useState(false);

    const onClick = async () => {
        setIsLoadingEngine(true);
        codefCertificate
            .initialize()
            // 인증서 다이얼로그 활성화
            .then(() => setCertificateLinkModalOpen(true))
            .catch((error: JsonpError) => {
                switch (error.errorCode) {
                    // 설치가 안되어 있는 사용자
                    case InstallCheckErrorCode.NotInstalled:
                        // 설치 모달 띄움
                        return setIsInstallCertProgramModalOpened(true);
                    // 구버전 모듈이 설치 되어있는 사용자
                    case InstallCheckErrorCode.VersionOver:
                        // 설치 모달 띄움(?)
                        return setIsInstallCertProgramModalOpened(true);
                    default:
                        return console.log(error.name, error.message, error.errorCode);
                }
            })
            .finally(() => {
                setIsLoadingEngine(false);
            });
    };

    return (
        <PureLayout>
            <article className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onBack={onBack}
                    />
                    <BusinessTypeSelector />
                </div>

                <BankCompaniesSelector
                    selectedCompanies={selectedBankCompanies}
                    setSelectedCompanies={setSelectedBankCompanies}
                />
                <CardCompaniesSelector
                    selectedCompanies={selectedCardCompanies}
                    setSelectedCompanies={setSelectedCardCompanies}
                />

                <br />
                {/*<section className="w-full flex items-center justify-center fixed left-0 bottom-0 px-4 py-6 bg-transparent z-10 backdrop-blur-2xl">*/}
                <section className="w-full flex items-center justify-center">
                    <NextStepButton
                        onClick={onClick}
                        isLoading={isLoadingEngine}
                        disabled={selectedBankCompanies.length === 0 && selectedCardCompanies.length === 0}
                    />
                </section>
            </article>

            {/* 코드에프 공동인증서 프로그램 설치 모달 */}
            <InstallCertProgramModal
                isOpen={isInstallCertProgramModalOpened}
                onClose={() => setIsInstallCertProgramModalOpened(false)}
            />

            {/* 인증서 선택 모달 */}
            <CertificateSignModal
                isOpen={isCertificateLinkModalOpen}
                onClose={() => setCertificateLinkModalOpen(false)}
                onCreate={(selectedCert, password, pfxInfo) => {
                    form.setValue('password', password);
                    form.setValue('certFile', pfxInfo);
                    form.setValue('certType', CodefCertificateType.PFX);
                    form.setValue('id', selectedCert.userName);
                    onNext([...selectedBankCompanies, ...selectedCardCompanies]);
                }}
            />
        </PureLayout>
    );
});
