import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '../../common/StatusHeader';
import {BusinessTypeSelector} from '../../common/BusinessTypeSelector';
import {BankSelector} from '../../common/BankSelector';
import {CardSelector} from '../../common/CardSelector';
import {NextStepButton} from '../../common/NextStepButton';
import {CertificateLinkModal} from '^clients/private/orgs/subscriptions/connection-steps/selectInstitutionsSection/ByCertificatePage/CertificateLinkModal';
import {CertificateSetupModal} from '^clients/private/orgs/subscriptions/connection-steps/selectInstitutionsSection/ByCertificatePage/CertificateSetupModal';
import LoadingScreen from './LoadingScreen';

export const ByCertificatePage = memo(() => {
    const {reset} = useFormContext<CreateAccountRequestDto>();
    const [isCertificateLinkModalOpen, setCertificateLinkModalOpen] = useState(false);
    const [isCertificateSetupModalOpen, setCertificateSetupModalOpen] = useState(false);
    const [isShowLoadingScreen, setIsShowLoadingScreen] = useState(false);
    const onclick = () => {
        // setCertificateLinkModalOpen(true);
        setCertificateSetupModalOpen(true);
    };

    return (
        <PureLayout>
            {isShowLoadingScreen ? (
                <LoadingScreen onComplete={() => setIsShowLoadingScreen(false)} />
            ) : (
                <>
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
                        <CardSelector />
                        <section className="w-full flex items-center justify-center">
                            <NextStepButton onClick={onclick} />
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
                </>
            )}
        </PureLayout>
    );
});
