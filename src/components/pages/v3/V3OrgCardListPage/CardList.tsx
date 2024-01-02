import React, {memo, useEffect} from 'react';
import {useModal} from '../share/modals/useModal';
import {CardItem} from '../V3OrgHomePage/mobile/CardItem';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState} from '^atoms/common';
import {useRecoilState, useRecoilValue} from 'recoil';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {creditCardListAtom} from '^models/CreditCard/atom';

export const CardList = memo(() => {
    const {open, isShow} = useModal(inputCardNumberModal);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!orgId && isNaN(orgId)) return;
        if (!isShow) return;

        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, [orgId, isShow]);

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
