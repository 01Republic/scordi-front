import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {allFulfilled} from '^utils/array';
import {codefCardApi} from '^models/CodefCard/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {subscriptionConnectedCodefCardsAtom} from '^models/Subscription/atom';
import {OrgSubscriptionConnectionSuccessPageRoute} from '^pages/orgs/[id]/subscriptions/connection/success';
import {FadeUp} from '^components/FadeUp';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefAccountConnectStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/CodefAccountConnectStep';
import {ConnectableCardListStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep';
import {CardCreatingStep} from '^clients/private/_modals/credit-cards/CardManualCreateModal/CardCreatingStep';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hooks/fetchCodefCardsByAccountInSafe';

enum AccountStep {
    accountConnect,
    cardSelect,
    creating,
    success,
}

interface ConnectStepsModalProps {
    cardCompany: CardAccountsStaticData;
    setCardCompany: (val: CardAccountsStaticData | undefined) => void;
    isConnectStepsModalOpen: boolean;
    setIsConnectStepsModalOpen: (val: boolean) => void;
}

export const ConnectStepsModal = memo((props: ConnectStepsModalProps) => {
    const {cardCompany, setCardCompany, isConnectStepsModalOpen, setIsConnectStepsModalOpen} = props;

    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const setSuccessCodefCards = useSetRecoilState(subscriptionConnectedCodefCardsAtom);
    const [step, setStep] = useState<AccountStep | undefined>(AccountStep.accountConnect);
    const [codefAccountFetchCardsResults, setCodefAccountFetchCardsResults] =
        useState<CodefAccountFetchCardsResult[]>();

    const onClose = () => {
        setIsConnectStepsModalOpen(false);
        setCardCompany(undefined);
        setCodefAccountFetchCardsResults(undefined);
    };

    const setAccountFetchCardsResults = (accountFetchCardsResults?: CodefAccountFetchCardsResult[]) => {
        setCodefAccountFetchCardsResults(accountFetchCardsResults);
        accountFetchCardsResults ? setStep(AccountStep.cardSelect) : setStep(AccountStep.accountConnect);
    };

    const onSubmit = async (checkedCards: CodefCardDto[]) => {
        if (!orgId || isNaN(orgId)) return;
        if (!checkedCards.length) return;

        setStep(AccountStep.creating);

        await allFulfilled(checkedCards.map((codefCard) => codefCardApi.createCreditCard(orgId, codefCard.id)))
            .then((res) => {
                const codefCards = res.map((res) => res.data);
                setSuccessCodefCards(codefCards);
            })
            .then(() => {
                setStep(undefined);
                setCardCompany(undefined);
            })
            .finally(() => {
                router.push(OrgSubscriptionConnectionSuccessPageRoute.path(orgId));
            })
            .catch(() => {
                setStep(AccountStep.accountConnect);
            });
    };

    return (
        <SlideUpModal
            open={isConnectStepsModalOpen}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box !pb-0"
        >
            <div className="absolute inset-0 px-6 pt-6">
                <FadeUp show={step === AccountStep.accountConnect} delay="deloy-[50ms]" className="h-full">
                    {cardCompany && (
                        <CodefAccountConnectStep
                            onBack={onClose}
                            cardCompany={cardCompany}
                            setAccountFetchCardsResults={setAccountFetchCardsResults}
                        />
                    )}
                </FadeUp>

                <FadeUp
                    show={cardCompany && codefAccountFetchCardsResults && step === AccountStep.cardSelect}
                    delay="deloy-[50ms]"
                    className="h-full"
                >
                    {cardCompany && codefAccountFetchCardsResults && (
                        <ConnectableCardListStep
                            onBack={() => setStep(AccountStep.accountConnect)}
                            cardCompany={cardCompany}
                            codefAccountFetchCardsResults={codefAccountFetchCardsResults}
                            setCodefAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                            onSubmit={onSubmit}
                        />
                    )}
                </FadeUp>

                <FadeUp show={step === AccountStep.creating} delay="delay-[50ms]">
                    <CardCreatingStep />
                </FadeUp>
            </div>
        </SlideUpModal>
    );
});
