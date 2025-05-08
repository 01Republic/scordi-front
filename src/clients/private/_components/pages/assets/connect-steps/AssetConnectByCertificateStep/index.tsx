import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import LoadingScreen from '../common/LoadingScreen';
import {StatusHeader} from '../common/StatusHeader';
import {BusinessTypeSelector} from '../common/BusinessTypeSelector';
import {BankSelector} from '../common/BankSelector';
import {CardCompaniesSelector} from '../common/CardCompaniesSelector';
import {NextStepButton} from '../common/NextStepButton';
import {CertificateLinkModal} from './CertificateLinkModal';
import {CertificateSetupModal} from './CertificateSetupModal';

export const AssetConnectByCertificateStep = memo(() => {
    const {reset, watch} = useFormContext<CreateAccountRequestDto>();
    const [isCertificateLinkModalOpen, setCertificateLinkModalOpen] = useState(false);
    const [isCertificateSetupModalOpen, setCertificateSetupModalOpen] = useState(false);
    const [isShowLoadingScreen, setIsShowLoadingScreen] = useState(false);

    const onClick = () => {
        // setCertificateLinkModalOpen(true);
        setCertificateSetupModalOpen(true);
    };

    // * TODO: LoadingScreen 수정 필요
    /*  LoadingScreen 이 끝난 시점에 다른 컴포넌트를 보여줄 수 있어야함.
     * ex. 해당 페이지에서는 LoadingScreen 이 끝나고 난 후 요청한 응답값을 보여주는 컴포넌트를 렌더링해야함.
     * onComplete 는 다른 컴포넌트를 렌더링할 수 있게 수정하고,
     * LoadingScreen 이 렌더링 되는 조건은 api 요청 상태 등으로 렌더링 조건을 수정하면 될 것 같음
     */
    if (isShowLoadingScreen) return <LoadingScreen onComplete={() => setIsShowLoadingScreen(false)} />;

    return (
        <PureLayout>
            <article className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onClick={() => reset({loginType: undefined})}
                    />
                    <BusinessTypeSelector />
                </div>

                <BankSelector />
                <CardCompaniesSelector />

                <section className="w-full flex items-center justify-center">
                    <NextStepButton onClick={onClick} />
                </section>
            </article>

            <CertificateLinkModal
                isOpen={isCertificateLinkModalOpen}
                onClose={() => setCertificateLinkModalOpen(false)}
            />

            <CertificateSetupModal
                isOpen={isCertificateSetupModalOpen}
                onClose={() => setCertificateSetupModalOpen(false)}
            />
        </PureLayout>
    );
});
