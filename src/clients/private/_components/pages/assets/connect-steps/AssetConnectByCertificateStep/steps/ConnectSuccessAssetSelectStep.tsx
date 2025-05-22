import React, {Dispatch, memo, SetStateAction, useEffect} from 'react';
import {useRouter} from 'next/router';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';

interface ConnectSuccessAssetSelectStepProps {
    bankResults?: CreateCodefBankAssets;
    cardResults?: CreateCodefCardAssets;
    selectedCodefBanks: CodefBankAccountDto[];
    setSelectedCodefBanks: Dispatch<SetStateAction<CodefBankAccountDto[]>>;
    onBack: () => void;
    setStep: () => void;
}

export const ConnectSuccessAssetSelectStep = memo((props: ConnectSuccessAssetSelectStepProps) => {
    const {cardResults, bankResults, selectedCodefBanks, setSelectedCodefBanks} = props;
    const {onBack, setStep} = props;
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) return;
    }, []);

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
                    onBack={onBack}
                />
                {bankResults?.successes && (
                    <SuccessConnectBankSelector
                        bankCreateResponse={bankResults?.successes}
                        selectedCodefBanks={selectedCodefBanks}
                        setSelectedCodefBanks={setSelectedCodefBanks}
                    />
                )}

                <div className="flex w-full justify-center">
                    <NextStepButton onClick={setStep} />
                </div>
            </div>
        </PureLayout>
    );
});
