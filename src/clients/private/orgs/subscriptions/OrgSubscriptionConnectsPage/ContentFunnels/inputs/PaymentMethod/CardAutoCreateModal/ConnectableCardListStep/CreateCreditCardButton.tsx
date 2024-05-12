import React, {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {codefCardApi} from '^models/CodefCard/api';
import {toast} from 'react-hot-toast';

interface CreateCreditCardButtonProps {
    checkedCards: CodefCardDto[];
    onSubmit: () => any;
}

export const CreateCreditCardButton = memo((props: CreateCreditCardButtonProps) => {
    const {checkedCards, onSubmit} = props;
    const orgId = useRecoilValue(orgIdParamState);

    const createCards = async () => {
        if (!orgId || isNaN(orgId)) return;
        if (!checkedCards.length) return;

        await Promise.allSettled(checkedCards.map((codefCard) => codefCardApi.createCreditCard(orgId, codefCard.id)));
        toast.success('새 카드를 추가했어요 :)');
        onSubmit();
    };

    return (
        <button
            type="button"
            className={`btn btn-block transition-all ${
                checkedCards.length ? 'btn-scordi' : 'btn-disabled !bg-gray-200 !text-gray-500'
            }`}
            onClick={createCards}
        >
            등록하기
        </button>
    );
});
CreateCreditCardButton.displayName = 'CreateCreditCardButton';
