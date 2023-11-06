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
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    // TODO: [to.진경님] 아래의 useRouterIdParamState 는 라우터에서 'orgId' 값을 가져오는데요,
    //  이건 'orgId' 라는 키에 대하여 페이지에서 1회만 하면 됩니다! ㅋㅋㅋ
    //  나머지는 다음처럼 그냥 useRecoilValue 로 가져오면 좀 더 최적화된 실행이 되구요 (좀 더 상태업데이트를 덜해서),
    //  다만 null 이나 isNaN 체크는 똑같이 해주면 됩니다!
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
                <ContentEmpty
                    onClick={openInputCardNumberModal}
                    text="등록된 카드가 없어요"
                    subtext="눌러서 카드 추가"
                />
            )}
        </ul>
    );
});
