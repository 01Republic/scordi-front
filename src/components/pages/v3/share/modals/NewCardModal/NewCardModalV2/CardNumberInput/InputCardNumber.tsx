import React, {ChangeEvent, memo, MutableRefObject, useEffect, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {currentCreditCardAtom} from '^models/CreditCard/atom';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {inputTextToCardNumberFormat} from '^utils/input-helper';

interface InputCardNumberProps {
    nextFocusInputRef?: MutableRefObject<HTMLInputElement | null>;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const {isShow} = useModal(newCardModalState);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);
    const setFormData = useSetRecoilState(createCreditCardDtoAtom);

    const {nextFocusInputRef} = props;

    useEffect(() => {
        inputRef.current?.focus();
    }, [isShow]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = inputTextToCardNumberFormat(e);
        const numbers = value.replace(/ - /g, '');
        const isFulfilled = numbers.length >= 16;

        if (!isFulfilled) return;

        /**
         * 다음 포커스를 이동할 인풋이 입력되어있는 경우에
         * 카드넘버 입력이 완성되었는지 확인하고
         * 완성이 되었을 때 다음 인풋으로 포커스를 넘깁니다.
         */
        if (nextFocusInputRef?.current) nextFocusInputRef.current?.focus();

        setFormData((prev) => ({
            ...prev,
            number1: numbers.slice(0, 4),
            number2: numbers.slice(4, 8),
            number3: numbers.slice(8, 12),
            number4: numbers.slice(12, 16),
        }));
    };

    return (
        <input
            ref={inputRef}
            defaultValue={currentCreditCard.fullNumber}
            onChange={onChange}
            className="input w-full input-bordered placeholder:text-xs"
            maxLength={25}
            placeholder="●●●● - ●●●● - ●●●● - ●●●● "
        />
    );
});
