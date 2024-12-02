import React, {Dispatch, memo, SetStateAction} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {ConnectableCardItem} from './ConnectableCardItem';

interface ConnectableCardListSectionProps {
    cardCompany: CardAccountsStaticData;
    codefCards: CodefCardDto[];
    checkedCards: CodefCardDto[];
    setCheckedCards: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const ConnectableCardListSection = memo((props: ConnectableCardListSectionProps) => {
    const {cardCompany, codefCards, checkedCards, setCheckedCards} = props;

    const isChecked = (codefCard: CodefCardDto) => checkedCards.map((c) => c.id).includes(codefCard.id);
    const toggle = (codefCard: CodefCardDto) => {
        setCheckedCards((list) => {
            const exist = list.map((c) => c.id).includes(codefCard.id);
            if (exist) {
                return list.filter((c) => c.id !== codefCard.id);
            } else {
                return [...list, codefCard];
            }
        });
    };

    const allChecked = checkedCards.length === codefCards.length;

    const toggleAll = () => {
        allChecked ? setCheckedCards([]) : setCheckedCards(codefCards);
    };

    return (
        <div>
            <div className="flex items-center justify-end mb-3">
                <span className="text-scordi cursor-pointer text-12 hover:underline" onClick={toggleAll}>
                    {allChecked ? '선택해제' : '전체선택'}
                </span>
            </div>

            {codefCards.map((codefCard, i) => (
                <ConnectableCardItem
                    key={i}
                    cardCompany={cardCompany}
                    codefCard={codefCard}
                    onClick={toggle}
                    checked={isChecked(codefCard)}
                />
            ))}
        </div>
    );
});
ConnectableCardListSection.displayName = 'ConnectableCardListSection';
