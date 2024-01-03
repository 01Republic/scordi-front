import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {cardIdParamState} from '^models/CreditCard/atom';

export const NewCardModalTitle = memo(() => {
    const cardId = useRecoilValue(cardIdParamState);

    return (
        <div className="py-5 pt-10">
            <p className="mb-4">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
            <h2 className="h1 leading-tight">카드 번호와 별칭을 입력해주세요</h2>
        </div>
    );
});
