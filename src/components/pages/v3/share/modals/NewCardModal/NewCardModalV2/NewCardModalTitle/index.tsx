import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {cardIdParamState} from '^models/CreditCard/atom';
import {ModalTitle} from '^v3/share/modals/ModalTitle';

export const NewCardModalTitle = memo(() => {
    const cardId = useRecoilValue(cardIdParamState);

    return (
        <ModalTitle title="카드 번호와 별칭을 입력해주세요" desc={cardId ? '카드 수정하기' : '새로운 카드 등록하기'} />
    );
});
