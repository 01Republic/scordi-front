import {Dispatch, memo, SetStateAction} from 'react';
import {useRouter} from 'next/router';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {SuccessCreditCardSection} from '../../AssetConnectSuccessPageTemplate/SuccessCreditCardSection';
import {NextStepButton} from '../../common/NextStepButton';

interface ConnectSuccessAssetSelectStepProps {
    setStep: () => void;
    codefCards: CodefCardDto[] | undefined;
    selectedCodefCards: CodefCardDto[];
    setSelectedCodefCards: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const ConnectSuccessAssetSelectStep = memo((props: ConnectSuccessAssetSelectStepProps) => {
    const {setStep, codefCards = [], selectedCodefCards, setSelectedCodefCards} = props;

    const router = useRouter();

    return (
        <PureLayout>
            <div className="flex flex-col gap-20">
                <StatusHeader
                    title="자산 연동이 완료되었어요"
                    icon={
                        <LottieNoSSR
                            src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />
                    }
                    onBack={() => router.back()}
                />
                {codefCards.length > 0 && (
                    <SuccessCreditCardSection
                        processedCodefCards={codefCards}
                        selectedCodefCards={selectedCodefCards}
                        setSelectedCodefCards={setSelectedCodefCards}
                    />
                )}
                <div className="flex w-full justify-center">
                    <NextStepButton onClick={setStep} />
                </div>
            </div>
        </PureLayout>
    );
});
