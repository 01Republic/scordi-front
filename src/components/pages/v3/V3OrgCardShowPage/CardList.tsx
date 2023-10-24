import React, {memo, useEffect} from 'react';
import {useModal} from '../share/modals/useModal';
import {CardItem} from '../V3OrgHomePage/mobile/CardItem';
import {inputCardNumberModal} from './modals/atom';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^api/credit-crads.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {creditCardListAtom} from './atom';

export const CardList = memo(() => {
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);

    useEffect(() => {
        if (!orgId && isNaN(orgId)) return;
        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, []);

    return (
        <ul>
            {creditCardList.length ? (
                <>
                    {creditCardList.map((item, i) => (
                        <CardItem key={i} card={item} setCreditCardList={setCreditCardList} />
                    ))}
                </>
            ) : (
                <ContentEmpty
                    onClick={openInputCardNumberModal}
                    text="등록된 카드가 없어요"
                    subtext="눌러서 카드 추가"
                />
            )}
        </ul>
    );
});
