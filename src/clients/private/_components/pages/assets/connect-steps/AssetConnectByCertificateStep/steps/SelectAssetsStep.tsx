import React, {Dispatch, memo, SetStateAction, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CreateCodefBankAssets, CreateCodefCardAssets} from '^models/CodefAccount/type/CreateCodefAssets';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {NextStepButton} from '^_components/pages/assets/connect-steps/common/NextStepButton';
import {SuccessConnectBankSelector} from './_component/SuccessConnectBankSelector';
import {AssetsConnectStepFlashHandler} from '^_components/pages/assets/connect-steps/common/AssetsConnectStepFlashHandler';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SuccessConnectCardSelector} from '^_components/pages/assets/connect-steps/AssetConnectByCertificateStep/steps/_component/SuccessConnectCardSelector';
import {AssetConnectOptionContext, EntryPath} from '^_components/pages/assets/connect-steps';
import {useOrgIdParam} from '^atoms/common';

interface SelectAssetsStepProps {
    bankResults?: CreateCodefBankAssets;
    cardResults?: CreateCodefCardAssets;
    selectedCodefBanks: CodefBankAccountDto[];
    setSelectedCodefBanks: Dispatch<SetStateAction<CodefBankAccountDto[]>>;
    selectedCodefCards: CodefCardDto[];
    setSelectedCodefCards: Dispatch<SetStateAction<CodefCardDto[]>>;
    onBack: () => any;
    onNext: () => any;
}

export const SelectAssetsStep = memo((props: SelectAssetsStepProps) => {
    const {cardResults, bankResults} = props;
    const {selectedCodefBanks, setSelectedCodefBanks, selectedCodefCards, setSelectedCodefCards} = props;
    const {onBack, onNext} = props;

    const {entryPath} = useContext(AssetConnectOptionContext);
    const router = useRouter();

    const orgId = useOrgIdParam();

    const successBanks = bankResults?.successes || [];
    const successCards = cardResults?.successes || [];

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
                <AssetsConnectStepFlashHandler
                    failuresBankResults={bankResults?.failures}
                    failuresCardResults={cardResults?.failures}
                />

                {successBanks.length > 0 && (
                    <SuccessConnectBankSelector
                        bankCreateResponse={successBanks}
                        selectedCodefBanks={selectedCodefBanks}
                        setSelectedCodefBanks={setSelectedCodefBanks}
                    />
                )}

                {successCards.length > 0 && (
                    <SuccessConnectCardSelector
                        cardCreateResponse={successCards}
                        selectedCodefCards={selectedCodefCards}
                        setSelectedCodefCards={setSelectedCodefCards}
                    />
                )}

                <div className="flex w-full justify-center">
                    <NextStepButton
                        onClick={onNext}
                        text={successBanks.length === 0 && successCards.length === 0 ? '대시보드로 가기' : '다음'}
                    />
                </div>
            </div>
        </PureLayout>
    );
});
