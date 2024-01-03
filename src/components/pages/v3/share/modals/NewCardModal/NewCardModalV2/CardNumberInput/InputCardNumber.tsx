import React, {ChangeEvent, memo, MutableRefObject, useEffect, useRef, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {CreditCardSecretInfo} from '^models/CreditCard/type';
import {currentCreditCardAtom} from '^models/CreditCard/atom';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {CardNumberInput} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNumberInput/CardNumberInput';

interface InputCardNumberProps {
    cardNameRef: MutableRefObject<HTMLInputElement | null>;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const [cardInfo, setCardInfo] = useState<CreditCardSecretInfo>();
    const {isShow} = useModal(newCardModalState);
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);

    const {cardNameRef} = props;

    const number1Ref = useRef<HTMLInputElement | null>(null);
    const number2Ref = useRef<HTMLInputElement | null>(null);
    const number3Ref = useRef<HTMLInputElement | null>(null);
    const number4Ref = useRef<HTMLInputElement | null>(null);

    // Detail page 에서 모달 띄울 시 존재함.
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);

    useEffect(() => {
        number1Ref.current?.focus();

        if (!currentCreditCard?.numbers) return;

        const decrypted = currentCreditCard.decryptSign();
        setCardInfo(decrypted);
    }, [isShow, currentCreditCard]);

    return (
        <div>
            <div className="flex gap-3 mb-3">
                <CardNumberInput
                    defaultValue={cardInfo?.number1}
                    inputRef={number1Ref}
                    nextInputRef={number2Ref}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCreateCreditCardDto((prev) => ({
                            ...prev,
                            number1: e.target.value,
                        }));
                    }}
                />
                <CardNumberInput
                    defaultValue={cardInfo?.number2}
                    inputRef={number2Ref}
                    nextInputRef={number3Ref}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCreateCreditCardDto((prev) => ({
                            ...prev,
                            number2: e.target.value,
                        }));
                    }}
                />
                <CardNumberInput
                    defaultValue={cardInfo?.number3}
                    inputRef={number3Ref}
                    nextInputRef={number4Ref}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCreateCreditCardDto((prev) => ({
                            ...prev,
                            number3: e.target.value,
                        }));
                    }}
                />
                <CardNumberInput
                    defaultValue={cardInfo?.number4}
                    inputRef={number4Ref}
                    nextInputRef={cardNameRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCreateCreditCardDto((prev) => ({
                            ...prev,
                            number4: e.target.value,
                        }));
                    }}
                />
            </div>
        </div>
    );
});
