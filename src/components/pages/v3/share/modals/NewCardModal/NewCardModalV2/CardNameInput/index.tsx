import React, {memo} from 'react';
import {FormControl} from '^components/util/form-control/FormControl';
import {useSetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';

export const CardNameInput = memo(() => {
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);

    return (
        <FormControl topLeftLabel="카드 별칭">
            <input
                // onChange={(e) => form.setValue('name', e.target.value)}
                onChange={(e) => setCreateCreditCardDto((prev) => ({...prev, name: e.target.value}))}
                name="cardName"
                type="text"
                placeholder="광고비 카드"
                className="input input-bordered w-full"
            />
        </FormControl>
    );
});
