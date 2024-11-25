import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import React, {memo, useEffect, useState} from 'react';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {codefAccountIdParamState} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FaChevronLeft} from 'react-icons/fa6';
import {LoadableBox} from '^components/util/loading';
import {ConnectableCardItem} from './ConnectableCardItem';
import {CreateCreditCardButton} from './CreateCreditCardButton';
import {ConnectableCardListSection} from './ConnectableCardListSection';

interface ConnectableCardListStepProps {
    cardCompany: CardAccountsStaticData;
    codefAccount: CodefAccountDto;
    onBack: () => any;
    onSubmit: (checkedCards: CodefCardDto[]) => any;
}

export const ConnectableCardListStep = memo((props: ConnectableCardListStepProps) => {
    const {cardCompany, codefAccount, onBack, onSubmit} = props;
    const {search, result, isLoading} = useNewCodefCards(codefAccountIdParamState);
    const [checkedCards, setCheckedCards] = useState<CodefCardDto[]>([]);

    const getCards = (accountId: number, force = false) => {
        search(
            {
                where: {accountId, isSleep: false},
                sync: true,
                itemsPerPage: 0,
            },
            false,
            force,
        );
    };

    useEffect(() => {
        getCards(codefAccount.id);
    }, [codefAccount]);

    const notConnectedCards = result.items.filter((card) => !card.creditCardId);
    const connectedCards = result.items.filter((card) => card.creditCardId);

    return (
        <div className="flex flex-col items-stretch h-full">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    새로 등록할 카드를 <br /> 선택해주세요.
                </h3>
            </div>

            <div className="mb-8">
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
                </LoadableBox>
            </div>

            {!isLoading && (
                <div className="py-4 mt-auto -mb-4">
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
}

export const ConnectableCardSelect = memo((props: ConnectableCardSelectProps) => {
    const {cardCompany, codefAccount, onBack, onSubmit} = props;
    const {search, result, isLoading} = useNewCodefCards(codefAccountIdParamState);
    const [checkedCard, setCheckedCard] = useState<CodefCardDto>();

    useEffect(() => {
        search(
            {
                where: {accountId: codefAccount.id, isSleep: false},
                sync: true,
                itemsPerPage: 0,
            },
            false,
            true,
        );
    }, [codefAccount]);

    return (
        <div className="flex flex-col items-stretch">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    새로 등록할 카드를 <br /> 선택해주세요.
                </h3>
            </div>

            <div className="mb-8">
                <LoadableBox isLoading={isLoading} noPadding>
                    {result.items.map((codefCard, i) => (
                        <ConnectableCardItem
                            key={i}
                            cardCompany={cardCompany}
                            codefCard={codefCard}
                            onClick={setCheckedCard}
                            checked={codefCard.id === checkedCard?.id}
                        />
                    ))}
                </LoadableBox>
            </div>

            {!isLoading && (
                <div className="py-4">
                    {checkedCard ? (
                        <CreateCreditCardButton checkedCards={[checkedCard]} onSubmit={([card]) => onSubmit(card)} />
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
