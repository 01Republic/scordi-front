import {memo, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {AccountConnectStep} from './byAccountSteps/AccountConnectStep';
import {ConnectSuccessAssetSelectStep} from './byAccountSteps/ConnectSuccessAssetSelectStep';
import {ConnectAssetsStep} from '../AssetConnectByCertificateFlow/steps/ConnectAssetsStep';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';

interface AssetConnectByAccountFlowProps {
    onBack: () => any;
    onFinish: (
        codefAccounts: CodefAccountDto[],
        failedCompanies: CodefApiAccountItemDto[],
        afterAccountCreated: boolean,
    ) => any;
}

enum ConnectByAccountStep {
    accountConnectStep,
    connectSuccessAssetSelectStep,
    selectAssetConnectLoadingStep,
}

/**
 * 홈페이지계정으로 자산 불러오기 Flow
 * --
 */
export const AssetConnectByAccountFlow = memo((props: AssetConnectByAccountFlowProps) => {
    const [step, setStep] = useState<ConnectByAccountStep>(ConnectByAccountStep.accountConnectStep);

    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [codefCards, setCodefCard] = useState<CodefCardDto[]>();
    const [selectedCodefCards, setSelectedCodefCards] = useState<CodefCardDto[]>([]);

    return (
        <>
            {/* 아이디/패스워드로 로그인 후 연결하고 싶은 카드를 선택 후 코드에프에서 불러온 카드를 스코디에 등록 */}
            {step === ConnectByAccountStep.accountConnectStep && (
                <AccountConnectStep
                    setStep={() => setStep(ConnectByAccountStep.connectSuccessAssetSelectStep)}
                    cardCompany={cardCompany}
                    setCardCompany={setCardCompany}
                    setCodefCard={setCodefCard}
                />
            )}

            {/* 등록된 스코디 카드 중 구독을 불러오고 싶은 카드를 선택 */}
            {step === ConnectByAccountStep.connectSuccessAssetSelectStep && (
                <ConnectSuccessAssetSelectStep
                    setStep={() => setStep(ConnectByAccountStep.selectAssetConnectLoadingStep)}
                    codefCards={codefCards}
                    selectedCodefCards={selectedCodefCards}
                    setSelectedCodefCards={setSelectedCodefCards}
                />
            )}

            {/* 선택된 카드들의 코드에프 결제내역 조회(등록 및 연동) 후 성공페이지로 이동 */}
            {step === ConnectByAccountStep.selectAssetConnectLoadingStep && (
                <ConnectAssetsStep
                    title="선택한 자산을 기준으로 구독을 찾고 있어요"
                    codefAssets={selectedCodefCards}
                    onNext={() => setStep(ConnectByAccountStep.accountConnectStep)}
                />
            )}
        </>
    );
});
