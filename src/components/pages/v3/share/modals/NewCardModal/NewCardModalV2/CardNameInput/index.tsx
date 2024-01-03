import React, {memo, MutableRefObject} from 'react';
import {FormControl} from '^components/util/form-control/FormControl';
import {useSetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';

interface CardNameInputProps {
    cardNameRef: MutableRefObject<HTMLInputElement | null>;
}

export const CardNameInput = memo((props: CardNameInputProps) => {
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);
    const {cardNameRef} = props;

    return (
        <FormControl topLeftLabel="카드 별칭">
            <input
                ref={cardNameRef}
                onChange={(e) => setCreateCreditCardDto((prev) => ({...prev, name: e.target.value}))}
                type="text"
                placeholder="광고비 카드"
                className="input input-bordered w-full"
            />
        </FormControl>
    );
});
