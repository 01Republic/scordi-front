import React, {ChangeEvent, FormEvent, memo, MutableRefObject} from 'react';
import {useSetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';

interface CardNumberInputProps {
    defaultValue: string | null | undefined;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    nextInputRef?: MutableRefObject<HTMLInputElement | null>;
    onChange: (e: ChangeEvent<HTMLInputElement>, ref: MutableRefObject<HTMLInputElement | null>) => void;
}
export const CardNumberInput = memo((props: CardNumberInputProps) => {
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);
    const {defaultValue, inputRef, nextInputRef, onChange} = props;

    const sliceMaxLength = (e: FormEvent<HTMLInputElement>) => {
        const value = `${e.currentTarget.value}`.trim();
        const maxLen = e.currentTarget.maxLength || 4;
        if (value.length > maxLen) e.currentTarget.value = value.slice(0, maxLen);
    };

    const moveNextInput = (value: string, nextInputRef: MutableRefObject<HTMLInputElement | null>) => {
        if (value.length == 4) nextInputRef.current?.focus();
    };

    return (
        <input
            ref={inputRef}
            type="number"
            placeholder="● ● ● ●"
            maxLength={4}
            defaultValue={defaultValue ?? ''}
            className="input input-bordered w-full placeholder:text-[0.5rem]"
            onChange={(e) => {
                // setCreateCreditCardDto((prev) => ({...prev}));
                onChange(e, inputRef);
                nextInputRef && moveNextInput(`${e.target.value}`.trim(), nextInputRef);
            }}
            onInput={(e) => sliceMaxLength(e)}
        />
    );
});
