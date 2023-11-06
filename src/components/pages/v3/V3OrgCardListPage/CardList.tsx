import React, {memo, useEffect} from 'react';
import {useModal} from '../share/modals/useModal';
import {CardItem} from '../V3OrgHomePage/mobile/CardItem';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^api/credit-cards.api';
import {orgIdParamState} from '^atoms/common';
import {useRecoilState, useRecoilValue} from 'recoil';
import {creditCardListAtom} from './atom';
import {inputCardNumberModal} from './modals/CardNumberModal/atom';

export const CardList = memo(() => {
    const {open} = useModal(inputCardNumberModal);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId && isNaN(orgId)) return;

        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, [orgId]);

    return (
        <ul>
            {creditCardList.length ? (
                <>
                    {creditCardList.map((item, i) => (
                        <CardItem key={i} card={item} />
                    ))}
                </>
            ) : (
                <ContentEmpty onClick={() => open()} text="등록된 카드가 없어요" subtext="눌러서 카드 추가" />
            )}
        </ul>
    );
});
