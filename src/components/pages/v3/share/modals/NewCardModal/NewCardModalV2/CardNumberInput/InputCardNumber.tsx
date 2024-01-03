import React, {ChangeEvent, Dispatch, memo, MutableRefObject, useEffect, useRef, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {CreditCardSecretInfo, UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {currentCreditCardAtom} from '^models/CreditCard/atom';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {CardNumberInput} from '^v3/share/modals/NewCardModal/NewCardModalV2/CardNumberInput/CardNumberInput';

interface InputCardNumberProps {
    form: UseFormReturn<UnSignedCreditCardFormData>;
    setDisabled?: Dispatch<React.SetStateAction<boolean>>;
    // onChange: (num1: number, num2: number, num3: number, num4: number) => any;
    onFulfilled: () => any;
}

export const InputCardNumber = memo((props: InputCardNumberProps) => {
    const [cardInfo, setCardInfo] = useState<CreditCardSecretInfo>();
    const {isShow} = useModal(newCardModalState);
    const setCreateCreditCardDto = useSetRecoilState(createCreditCardDtoAtom);

    const number1Ref = useRef<HTMLInputElement | null>(null);
    const number2Ref = useRef<HTMLInputElement | null>(null);
    const number3Ref = useRef<HTMLInputElement | null>(null);
    const number4Ref = useRef<HTMLInputElement | null>(null);

    // Detail page 에서 모달 띄울 시 존재함.
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);

    // 만약 수정 중인 경우 form에 기본 값을 세팅합니다.
    useEffect(() => {
        if (!currentCreditCard?.numbers) return;

        const decrypted = currentCreditCard.decryptSign();
        setCardInfo(decrypted);
    }, [currentCreditCard]);

    useEffect(() => {
        number1Ref.current?.focus();
    }, [isShow]);

    // 4개의 인풋이 모두 찼을 때
    const onFulfilled = () => {
        const isValidValue = (val: string) => val.length === 4;
        return (
            isValidValue(cardInfo?.number1 || '') &&
            isValidValue(cardInfo?.number1 || '') &&
            isValidValue(cardInfo?.number1 || '') &&
            isValidValue(cardInfo?.number1 || '')
        );
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>, ref: MutableRefObject<HTMLInputElement | null>) => {
        console.log(ref.current);
        console.log(e.target.value);
    };

    return (
        <div>
            <div className="flex gap-3 mb-3">
                <CardNumberInput
                    defaultValue={cardInfo?.number1}
                    inputRef={number1Ref}
                    nextInputRef={number2Ref}
                    onChange={(e) => {

                        setCardInfo((prev)=>{...prev, number1:e.target.value})
                    }}
                />
                <CardNumberInput
                    defaultValue={cardInfo?.number2}
                    inputRef={number2Ref}
                    nextInputRef={number3Ref}
                    onChange={onChange}
                />
                <CardNumberInput
                    defaultValue={cardInfo?.number3}
                    inputRef={number3Ref}
                    nextInputRef={number4Ref}
                    onChange={onChange}
                />
                <CardNumberInput defaultValue={cardInfo?.number4} inputRef={number4Ref} onChange={onChange} />
            </div>
        </div>
    );
});
