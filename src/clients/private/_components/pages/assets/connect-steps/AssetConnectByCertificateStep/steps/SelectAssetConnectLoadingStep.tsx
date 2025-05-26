import {memo, useContext, useState} from 'react';
import {errorToast} from '^api/api';
import {allFulfilled} from '^utils/array';
import {useOrgIdParam} from '^atoms/common';
import {codefCardApi} from '^models/CodefCard/api';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';
import {LoadingScreen} from '^_components/pages/assets/connect-steps/common/LoadingScreen';

interface SelectAssetConnectLoadingStepProps {
    selectedCodefBanks: CodefBankAccountDto[];
    selectedCodefCards: CodefCardDto[];
    setStep: () => void;
}

export const SelectAssetConnectLoadingStep = memo((props: SelectAssetConnectLoadingStepProps) => {
    const {selectedCodefBanks, selectedCodefCards, setStep} = props;
    const {onSuccessfullyCreateByCertificate} = useContext(AssetConnectOptionContext);

    const orgId = useOrgIdParam();
    const [isLoading, setIsLoading] = useState(false);
    const [createCodefBanks, setCreateCodefBanks] = useState<CodefBankAccountDto[]>();
    const [createCodefCards, setCreateCodefCards] = useState<CodefCardDto[]>();

    const onSync = () => {
        if (!selectedCodefBanks.length && !selectedCodefCards.length) return;

        setIsLoading(true);

        allFulfilled(
            selectedCodefBanks.map((bankAccount) => codefBankAccountApi.createBankAccount(orgId, bankAccount.id)),
        )
            .then((bankRes) => {
                const codefBanks = bankRes.map((res) => res.data);
                setCreateCodefBanks(codefBanks);

                return allFulfilled(
                    codefBanks.map((bank) => codefBankAccountApi.histories(orgId, bank.id, {sync: true})),
                ).then(() => codefBanks);
            })
            .then(() => {
                return allFulfilled(
                    selectedCodefCards.map((card) => codefCardApi.createCreditCard(orgId, card.id)),
                ).then((cardRes) => {
                    const codefCards = cardRes.map((res) => res.data);
                    setCreateCodefCards(codefCards);

                    return allFulfilled(codefCards.map((card) => codefCardApi.histories(orgId, card.id, {sync: true})));
                });
            })
            .catch((err) => {
                errorToast(err);
                setStep();
            });
    };

    return (
        <LoadingScreen
            message="선택한 계좌와 카드를 기준으로 구독을 찾고 있어요"
            onCreat={onSync}
            onClose={() => {
                if (onSuccessfullyCreateByCertificate) {
                    onSuccessfullyCreateByCertificate(createCodefBanks, createCodefCards);
                }
            }}
        />
    );
});
