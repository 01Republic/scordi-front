import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';

interface CreateCreditCardButtonProps {
    checkedCards: CodefCardDto[];
    onSubmit: (checkedCards: CodefCardDto[]) => any;
    text?: string;
}

export const CreateCreditCardButton = memo((props: CreateCreditCardButtonProps) => {
    const {checkedCards, onSubmit, text = '추가하기'} = props;

    return (
        <button
            type="button"
            className={`btn btn-block transition-all ${
                checkedCards.length ? 'btn-scordi' : 'btn-disabled !bg-gray-200 !text-gray-500'
            }`}
            onClick={() => onSubmit(checkedCards)}
        >
            {text}
        </button>
    );
});
CreateCreditCardButton.displayName = 'CreateCreditCardButton';
