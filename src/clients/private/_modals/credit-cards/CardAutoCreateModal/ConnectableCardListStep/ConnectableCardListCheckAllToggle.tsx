import React, {Dispatch, memo, SetStateAction} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

interface ConnectableCardListCheckAllToggleProps {
    codefCards: CodefCardDto[];
    checkedCards: CodefCardDto[];
    setCheckedCards: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const ConnectableCardListCheckAllToggle = memo((props: ConnectableCardListCheckAllToggleProps) => {
    const {codefCards, checkedCards, setCheckedCards} = props;

    const allChecked = checkedCards.length === codefCards.length;

    const toggleAll = () => {
        allChecked ? setCheckedCards([]) : setCheckedCards(codefCards);
    };

    return (
        <div className="flex items-center justify-end mb-3">
            {!!codefCards.length ? (
                <span className="text-scordi cursor-pointer text-12 hover:underline" onClick={toggleAll}>
                    {allChecked ? '선택해제' : '전체선택'}
                </span>
            ) : (
                <span className="text-scordi cursor-pointer text-12 hover:underline">&nbsp;</span>
            )}
        </div>
    );
});
ConnectableCardListCheckAllToggle.displayName = 'ConnectableCardListCheckAllToggle';
