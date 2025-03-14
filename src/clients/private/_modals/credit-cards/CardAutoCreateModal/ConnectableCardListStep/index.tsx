import React, {memo, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {errorToast} from '^api/api';
import {useUnmount} from '^hooks/useUnmount';
import {codefAccountIdParamState} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {LoadableBox} from '^components/util/loading';
import {ConnectableCardItem} from './ConnectableCardItem';
import {CreateCreditCardButton} from './CreateCreditCardButton';
import {ConnectableCardListSection} from './ConnectableCardListSection';
import {ConnectableCardListCheckAllToggle} from './ConnectableCardListCheckAllToggle';
import {ChevronLeft} from 'lucide-react';

interface ConnectableCardListStepProps {
    cardCompany: CardAccountsStaticData;
    codefAccount: CodefAccountDto;
    onBack: () => any;
    onSubmit: (checkedCards: CodefCardDto[]) => any;
}

export const ConnectableCardListStep = memo((props: ConnectableCardListStepProps) => {
    const {cardCompany, codefAccount, onBack, onSubmit} = props;
    const {search, result, isLoading, reset} = useNewCodefCards(codefAccountIdParamState);
    const [checkedCards, setCheckedCards] = useState<CodefCardDto[]>([]);

    const getCards = debounce((accountId: number) => {
        search({
            where: {accountId, isSleep: false},
            sync: true,
            itemsPerPage: 0,
        }).catch(errorToast);
    }, 500);

    useEffect(() => {
        getCards(codefAccount.id);
    }, [codefAccount]);

    useUnmount(() => reset());

    const notConnectedCards = result.items.filter((card) => !card.creditCardId);
    const connectedCards = result.items.filter((card) => card.creditCardId);

    return (
        <div className="flex flex-col items-stretch h-full -mx-6">
            <div className="mb-4 px-6">
                <div className="pt-4 mb-6">
                    <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
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
                <LoadableBox isLoading={isLoading} noPadding>
                    {!!notConnectedCards.length && (
                        <ConnectableCardListSection
                            cardCompany={cardCompany}
                            codefCards={notConnectedCards}
                            checkedCards={checkedCards}
                            setCheckedCards={setCheckedCards}
                        />
                    )}

                    {connectedCards.map((codefCard, i) => (
                        <ConnectableCardItem key={i} cardCompany={cardCompany} codefCard={codefCard} />
                    ))}

                    {!notConnectedCards.length && (
                        <div className="py-14 text-gray-400 text-center text-14 font-medium">
                            이미 모든 카드가 연결되어있네요!
                        </div>
                    )}

                    <br />
                    <br />
                </LoadableBox>
            </div>

            {!isLoading && (
                <div className="pb-4 mt-[-1rem] pt-[1rem] bg-[linear-gradient(to_bottom,_transparent,_white_25%,_white)] sticky bottom-0 px-6">
                    {notConnectedCards.length ? (
                        <CreateCreditCardButton checkedCards={checkedCards} onSubmit={onSubmit} />
                    ) : (
                        <button type="button" className={`btn btn-block btn-scordi`} onClick={onBack}>
                            돌아가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
});
ConnectableCardListStep.displayName = 'ConnectableCardListStep';

interface ConnectableCardSelectProps {
    cardCompany: CardAccountsStaticData;
    codefAccount: CodefAccountDto;
    onBack: () => any;
    onSubmit: (checkedCard: CodefCardDto) => any;
    onMergeSubmit?: (checkedCard: CodefCardDto) => any;
}

export const ConnectableCardSelect = memo((props: ConnectableCardSelectProps) => {
    const {cardCompany, codefAccount, onBack, onSubmit, onMergeSubmit} = props;
    const {search, result, isLoading, reset} = useNewCodefCards(codefAccountIdParamState);
    const [checkedCard, setCheckedCard] = useState<CodefCardDto>();

    const fetchCards = debounce(() => {
        search({
            where: {accountId: codefAccount.id, isSleep: false},
            sync: true,
            itemsPerPage: 0,
        });
    }, 500);

    useEffect(() => {
        if (codefAccount) fetchCards();
    }, [codefAccount]);

    useUnmount(() => reset());

    return (
        <div className="flex-grow flex flex-col items-stretch">
            <div className="mb-4">
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

            <div className="mb-8">
                <LoadableBox isLoading={isLoading} noPadding>
                    {result.items.map((codefCard, i) => (
                        <ConnectableCardItem
                            key={i}
                            cardCompany={cardCompany}
                            codefCard={codefCard}
                            onClick={setCheckedCard}
                            onMerge={onMergeSubmit ? setCheckedCard : undefined}
                            checked={codefCard.id === checkedCard?.id}
                        />
                    ))}
                </LoadableBox>
            </div>

            {!isLoading && (
                <div className="p-4 absolute bottom-0 left-0 right-0">
                    {checkedCard ? (
                        <CreateCreditCardButton
                            checkedCards={[checkedCard]}
                            onSubmit={([card]) => {
                                !card.creditCardId ? onSubmit(card) : onMergeSubmit && onMergeSubmit(card);
                            }}
                            text={checkedCard.creditCardId && onMergeSubmit ? '병합하기' : undefined}
                        />
                    ) : (
                        <button type="button" className={`btn btn-block btn-scordi`} onClick={onBack}>
                            돌아가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
});
ConnectableCardSelect.displayName = 'ConnectableCardSelect';
