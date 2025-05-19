import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {codefCertificate} from '^lib/codef/certificate/main';
import {JsonpError} from '^lib/codef/certificate/utils/jsonp';
import {InstallCheckErrorCode} from '^lib/codef/certificate/main/errors';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {LoadingScreen} from '../common/LoadingScreen';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '../common/StatusHeader';
import {BusinessTypeSelector} from '../common/BusinessTypeSelector';
import {CardCompaniesSelector} from '../common/CardCompaniesSelector';
import {BankCompaniesSelector} from '../common/BankCompaniesSelector';
import {NextStepButton} from '../common/NextStepButton';
import {CertificateSetupModal} from './CertificateSetupModal';
import {CertificateLinkModal} from './CertificateLinkModal';

export const AssetConnectByCertificateStep = memo(() => {
    const {reset, watch} = useFormContext<CreateAccountRequestDto>();
    const [selectedBankCompanies, setSelectedBankCompanies] = useState<BankAccountsStaticData[]>([]);
    const [selectedCardCompanies, setSelectedCardCompanies] = useState<CardAccountsStaticData[]>([]);
    const [isCertificateLinkModalOpen, setCertificateLinkModalOpen] = useState(false);
    const [isCertificateSetupModalOpen, setCertificateSetupModalOpen] = useState(false);
    const [isShowLoadingScreen, setIsShowLoadingScreen] = useState(false);
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
                        return setCertificateSetupModalOpen(true);
                    // 구버전 모듈이 설치 되어있는 사용자
                    case InstallCheckErrorCode.VersionOver:
                        // 설치 모달 띄움(?)
                        return setCertificateSetupModalOpen(true);
                    default:
                        return console.log(error.name, error.message, error.errorCode);
                }
            })
            .finally(() => setIsLoadingEngine(false));
    };

    // * TODO: LoadingScreen 수정 필요
    /*  LoadingScreen 이 끝난 시점에 다른 컴포넌트를 보여줄 수 있어야함.
     * ex. 해당 페이지에서는 LoadingScreen 이 끝나고 난 후 요청한 응답값을 보여주는 컴포넌트를 렌더링해야함.
     * onComplete 는 다른 컴포넌트를 렌더링할 수 있게 수정하고,
     * LoadingScreen 이 렌더링 되는 조건은 api 요청 상태 등으로 렌더링 조건을 수정하면 될 것 같음
     */
    if (isShowLoadingScreen)
        return (
            <LoadingScreen
                message="은행사 또는 카드사를 기준으로 계좌와 카드를 찾고 있어요"
                onComplete={() => setIsShowLoadingScreen(false)}
            />
        );

    return (
        <PureLayout>
            <article className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onBack={() => reset({loginType: undefined})}
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
            <CertificateSetupModal
                isOpen={isCertificateSetupModalOpen}
                onClose={() => setCertificateSetupModalOpen(false)}
            />

            {/* 인증서 선택 모달 */}
            <CertificateLinkModal
                isOpen={isCertificateLinkModalOpen}
                onClose={() => setCertificateLinkModalOpen(false)}
            />
        </PureLayout>
    );
});
