import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ArrowLeft} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainerSection} from '^clients/private/_layouts/PureLayout/PureLayoutContainerSection';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCertificateType, CodefCustomerType} from '^models/CodefAccount/type/enums';
import {CodefCompanyStaticData} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {
    CertificateSignModal,
    InstallCertProgramModal,
    codefCertificate,
    InstallCheckErrorCode,
    JsonpError,
} from '^lib/codef/certificate';
import {StatusHeader} from '../../connect-steps/common/StatusHeader';
import {BusinessTypeSelector} from '../../connect-steps/common/BusinessTypeSelector';
import {BankCompaniesSelector} from '../../connect-steps/common/BankCompaniesSelector';
import {CardCompaniesSelector} from '../../connect-steps/common/CardCompaniesSelector';
import {NextStepButton} from '../../connect-steps/common/NextStepButton';
import {toast} from 'react-hot-toast';

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
                    case InstallCheckErrorCode.RequestTimeout: // 프로그램이 동작하지 않음
                    case InstallCheckErrorCode.Unknown: // 프로그램 연결에러
                        toast('프로그램이 연결되지 않았어요. 조금 뒤에 다시 시도해주세요.');
                        return console.log(error.name, error.message, error.errorCode);
                    case InstallCheckErrorCode.NotInstalled: // 설치가 안되어 있는 사용자
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
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                    />

                    <BusinessTypeSelector />
                </div>
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="mb-20">
                <BankCompaniesSelector
                    selectedCompanies={selectedBankCompanies}
                    setSelectedCompanies={setSelectedBankCompanies}
                />
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="mb-20">
                <CardCompaniesSelector
                    selectedCompanies={selectedCardCompanies}
                    setSelectedCompanies={setSelectedCardCompanies}
                />
            </PureLayoutContainerSection>

            <PureLayoutContainerSection className="max-w-full sticky bottom-0 py-4 bg-layout-background flex items-center justify-center">
                <NextStepButton
                    onClick={onClick}
                    isLoading={isLoadingEngine}
                    disabled={selectedBankCompanies.length === 0 && selectedCardCompanies.length === 0}
                />
            </PureLayoutContainerSection>

            {/* 코드에프 공동인증서 프로그램 설치 모달 */}
            <InstallCertProgramModal
                isOpen={isInstallCertProgramModalOpened}
                onClose={() => setIsInstallCertProgramModalOpened(false)}
                onInstall={() => {
                    setCertificateLinkModalOpen(true);
                    setIsInstallCertProgramModalOpened(false);
                }}
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
                    if (!form.getValues('clientType')) {
                        form.setValue('clientType', CodefCustomerType.Business);
                    }
                    onNext([...selectedBankCompanies, ...selectedCardCompanies]);
                }}
            />
        </PureLayout>
    );
});
