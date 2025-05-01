import React, {Dispatch, memo, SetStateAction} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountControl} from './CodefAccountControl';
import {ConnectableCardListSection} from './ConnectableCardListSection';
import {ConnectableCardItem} from './ConnectableCardItem';

interface ConnectableCardsByAccountProps {
    cardCompany: CardAccountsStaticData;
    codefAccountFetchCardsResult: CodefAccountFetchCardsResult;
    checkedCards: CodefCardDto[];
    setCheckedCards?: Dispatch<SetStateAction<CodefCardDto[]>>;
    onCardItemClick?: (codefCard: CodefCardDto) => any;
    onCardItemMerge?: (codefCard: CodefCardDto) => any;
    onEditButtonClick: (codefAccount: CodefAccountDto) => any;
    onDestroy: (codefAccount: CodefAccountDto) => any;
}

export const ConnectableCardsByAccount = memo((props: ConnectableCardsByAccountProps) => {
    const {
        cardCompany,
        codefAccountFetchCardsResult: result,
        checkedCards,
        setCheckedCards,
        onCardItemClick,
        onCardItemMerge,
        onEditButtonClick,
        onDestroy,
    } = props;
    const {
        codefAccount: {codefCards},
    } = result;
    const notConnectedCards = codefCards.filter((card) => !card.creditCardId);
    const connectedCards = codefCards.filter((card) => card.creditCardId);

    const activeAccountControl = true;

    return (
        <div>
            {activeAccountControl && (
                <CodefAccountControl
                    cardCompany={cardCompany}
                    codefAccountFetchCardsResult={result}
                    onEditButtonClick={() => onEditButtonClick(result.codefAccount)}
                    onDestroy={() => onDestroy(result.codefAccount)}
                />
            )}

            <div className="pl-4">
                <div className="pl-4 border-l border-scordi-200">
                    {!!notConnectedCards.length && (
                        <ConnectableCardListSection
                            cardCompany={cardCompany}
                            codefCards={notConnectedCards}
                            checkedCards={checkedCards}
                            setCheckedCards={setCheckedCards}
                            avatarHidden={activeAccountControl}
                            onClick={onCardItemClick}
                        />
                    )}

                    {connectedCards.map((codefCard, i) => (
                        <ConnectableCardItem
                            key={i}
                            cardCompany={cardCompany}
                            codefCard={codefCard}
                            avatarHidden={activeAccountControl}
                            onClick={onCardItemClick}
                            onMerge={onCardItemMerge}
                            checked={checkedCards.includes(codefCard)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});
ConnectableCardsByAccount.displayName = 'ConnectableCardsByAccount';
