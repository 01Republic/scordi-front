import React, {Dispatch, memo, SetStateAction, useState} from 'react';
import {ChevronLeft} from 'lucide-react';
import {FadeUp} from '^components/FadeUp';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hook';
import {ConnectableCardsByAccount} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectableCardsByAccount';
import {ConnectNewAccountButton} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectNewAccountButton';
import {ConnectEditAccountNestedStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectEditAccountNestedStep';
import {ConnectNewAccountNestedStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectNewAccountNestedStep';
import {CreateCreditCardButton} from './CreateCreditCardButton';

interface ConnectableCardSelectProps {
    cardCompany: CardAccountsStaticData;
    codefAccountFetchCardsResults: CodefAccountFetchCardsResult[];
    setCodefAccountFetchCardsResults: Dispatch<SetStateAction<CodefAccountFetchCardsResult[] | undefined>>;
    onBack: () => any;
    onSubmit: (checkedCard: CodefCardDto) => any;
    onMergeSubmit?: (checkedCard: CodefCardDto) => any;
}

enum CardSelectStep {
    cardSelect,
    editAccount,
    newAccount,
}

/**
 * 코드에프 카드 자동등록 모달 스텝 중,
 * ConnectableCardListStep 과 동일한 위상을 지닙니다.
 *
 * 차이점 1. 병합지원여부
 * ConnectableCardListStep 는 카드병합 관련 비즈니스로직을 다루지 않지만,
 * 여기서는 카드병합 관련 비즈니스로직이 포함됩니다.
 *
 * 차이점 2. 셀렉트 갯수
 * ConnectableCardListStep 는 여러 코드에프카드를 스코디에 한번에 등록할 수 있도록 '멀티-셀렉트' 형태이지만,
 * 여기서는 특정 카드에 코드에프 API 를 연동하므로 '모노-셀렉트'로 동작합니다.
 */
export const ConnectableCardSelect = memo((props: ConnectableCardSelectProps) => {
    const {
        cardCompany,
        codefAccountFetchCardsResults,
        setCodefAccountFetchCardsResults,
        onBack,
        onSubmit,
        onMergeSubmit,
    } = props;
    const [checkedCard, setCheckedCard] = useState<CodefCardDto>();
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
                            <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                        </div>
                        <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                        {onMergeSubmit ? (
                            <h3 className="font-bold text-xl leading-tight">
                                어떤 카드와 연결할까요? <br />
                                <span className="font-medium text-14">이미 연결된 카드가 있다면 병합할 수 있어요.</span>
                            </h3>
                        ) : (
                            <h3 className="font-bold text-xl leading-tight">
                                새로 등록할 카드를 <br /> 모두 선택해주세요.
                            </h3>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar px-6">
                        {codefAccountFetchCardsResults.map((result, i) => (
                            <ConnectableCardsByAccount
                                key={i}
                                cardCompany={cardCompany}
                                codefAccountFetchCardsResult={result}
                                checkedCards={checkedCard ? [checkedCard] : []}
                                onCardItemClick={setCheckedCard}
                                onCardItemMerge={onMergeSubmit ? setCheckedCard : undefined}
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
                            disabled={!!checkedCard}
                        />

                        {checkedCard ? (
                            <CreateCreditCardButton
                                checkedCards={[checkedCard]}
                                onSubmit={([card]) => {
                                    !card.creditCardId ? onSubmit(card) : onMergeSubmit && onMergeSubmit(card);
                                }}
                                text={checkedCard.creditCardId && onMergeSubmit ? '병합하기' : '연결하기'}
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
ConnectableCardSelect.displayName = 'ConnectableCardSelect';
