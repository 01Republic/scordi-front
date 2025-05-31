import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {FadeUp} from '^components/FadeUp';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {ModalLeftBackButton} from '^clients/private/_modals/_common/ModalLeftBackButton';
import {ConnectableCardListCheckAllToggle} from './ConnectableCardListCheckAllToggle';
import {ConnectableCardsByAccount} from './ConnectableCardsByAccount';
import {ConnectNewAccountButton} from './ConnectNewAccountButton';
import {ConnectEditAccountNestedStep} from './ConnectEditAccountNestedStep';
import {ConnectNewAccountNestedStep} from './ConnectNewAccountNestedStep';
import {CreateCreditCardButton} from './CreateCreditCardButton';

interface ConnectableCardListStepProps {
    cardCompany: CardAccountsStaticData;
    codefAccountFetchCardsResults: CodefAccountFetchCardsResult[];
    setCodefAccountFetchCardsResults: Dispatch<SetStateAction<CodefAccountFetchCardsResult[] | undefined>>;
    onBack: () => any;
    onSubmit: (checkedCards: CodefCardDto[]) => any;
    isMonoSelect?: boolean;
}

enum CardSelectStep {
    cardSelect,
    editAccount,
    newAccount,
}

export const ConnectableCardListStep = memo((props: ConnectableCardListStepProps) => {
    const {cardCompany, codefAccountFetchCardsResults, setCodefAccountFetchCardsResults, onBack, onSubmit} = props;
    const [checkedCards, setCheckedCards] = useState<CodefCardDto[]>([]);
    const [step, setStep] = useState(CardSelectStep.cardSelect);
    const [editCodefAccount, setEditCodefAccount] = useState<CodefAccountDto>();

    const notConnectedCards = codefAccountFetchCardsResults.flatMap(({codefAccount}) => {
        return codefAccount.codefCards.filter((card) => !card.creditCardId);
    });

    return (
        <>
            {step === CardSelectStep.cardSelect && (
                <div className="flex flex-col items-stretch h-full -mx-6">
                    <div className="mb-4 px-6">
                        <div className="mb-4">
                            <ModalLeftBackButton onClick={onBack} />
                        </div>
                        <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                        <h3 className="font-bold text-xl leading-tight">
                            새로 등록할 카드를 <br /> 모두 선택해주세요.
                        </h3>

                        <ConnectableCardListCheckAllToggle
                            codefCards={notConnectedCards}
                            checkedCards={checkedCards}
                            setCheckedCards={setCheckedCards}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar px-6">
                        {codefAccountFetchCardsResults.map((result, i) => (
                            <ConnectableCardsByAccount
                                key={i}
                                cardCompany={cardCompany}
                                codefAccountFetchCardsResult={result}
                                checkedCards={checkedCards}
                                setCheckedCards={setCheckedCards}
                                onEditButtonClick={(codefAccount) => {
                                    setEditCodefAccount(codefAccount);
                                    setStep(CardSelectStep.editAccount);
                                }}
                                onDestroy={(codefAccount) => {
                                    const newResults = codefAccountFetchCardsResults.filter((r) => {
                                        return r.codefAccount.id !== codefAccount.id;
                                    });
                                    setCodefAccountFetchCardsResults(newResults);
                                    setStep(CardSelectStep.cardSelect);
                                    if (newResults.length === 0) onBack();
                                }}
                            />
                        ))}

                        {!notConnectedCards.length && (
                            <div className="py-14 text-gray-400 text-center text-14 font-medium">
                                이미 모든 카드가 연결되어있네요!
                            </div>
                        )}

                        <br />
                        <br />
                    </div>

                    <div className="pb-4 mt-[-1rem] pt-[1rem] bg-[linear-gradient(to_bottom,_transparent,_white_25%,_white)] sticky bottom-0 px-6 space-y-2">
                        <ConnectNewAccountButton
                            onClick={() => setStep(CardSelectStep.newAccount)}
                            disabled={checkedCards.length > 0}
                        />

                        {notConnectedCards.length ? (
                            <CreateCreditCardButton
                                checkedCards={checkedCards}
                                onSubmit={onSubmit}
                                text={
                                    checkedCards.length > 0
                                        ? `선택된 ${checkedCards.length}개의 카드 등록하기`
                                        : '등록할 카드를 선택해주세요.'
                                }
                            />
                        ) : (
                            <button
                                type="button"
                                className={`btn btn-block btn-gray no-animation btn-animation`}
                                onClick={onBack}
                            >
                                돌아가기
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* 계정 수정 */}
            <FadeUp show={editCodefAccount && step === CardSelectStep.editAccount} className="h-full">
                {editCodefAccount && step === CardSelectStep.editAccount && (
                    <ConnectEditAccountNestedStep
                        cardCompany={cardCompany}
                        codefAccount={editCodefAccount}
                        onBack={() => {
                            setStep(CardSelectStep.cardSelect);
                            setEditCodefAccount(undefined);
                        }}
                        setCodefAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                    />
                )}
            </FadeUp>

            {/* 새 계정 추가 */}
            <FadeUp show={step === CardSelectStep.newAccount} className="h-full">
                {step === CardSelectStep.newAccount && (
                    <ConnectNewAccountNestedStep
                        cardCompany={cardCompany}
                        onBack={() => setStep(CardSelectStep.cardSelect)}
                        setCodefAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                    />
                )}
            </FadeUp>
        </>
    );
});
ConnectableCardListStep.displayName = 'ConnectableCardListStep';
