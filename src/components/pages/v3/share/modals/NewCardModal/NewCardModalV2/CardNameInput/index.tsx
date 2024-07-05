import React, {memo, MutableRefObject} from 'react';
import {useSetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';

interface CardNameInputProps {
    cardNameRef: MutableRefObject<HTMLInputElement | null>;
}

export const CardNameInput = memo((props: CardNameInputProps) => {
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);
    const {cardNameRef} = props;

    return (
        <input
            ref={cardNameRef}
            onChange={(e) => setCreateCreditCardDto((prev) => ({...prev, name: e.target.value}))}
            type="text"
            placeholder="ex. 광고비 카드"
            className="input input-bordered w-full"
        />
    );
});
