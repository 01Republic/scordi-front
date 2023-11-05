import React, {memo, useEffect} from 'react';
import {useModal} from '../share/modals/useModal';
import {CardItem} from '../V3OrgHomePage/mobile/CardItem';
import {inputCardNumberModal} from './modals/atom';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^api/credit-cards.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState, useRecoilValue} from 'recoil';
import {creditCardListAtom} from './atom';

export const CardList = memo(() => {
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const [creditCardList, setCreditCardList] = useRecoilState(creditCardListAtom);
    // TODO: [to.진경님] 아래의 useRouterIdParamState 는 라우터에서 'orgId' 값을 가져오는데요,
    //  이건 'orgId' 라는 키에 대하여 페이지에서 1회만 하면 됩니다! ㅋㅋㅋ
    //  나머지는 다음처럼 그냥 useRecoilValue 로 가져오면 좀 더 최적화된 실행이 되구요 (좀 더 상태업데이트를 덜해서),
    //  다만 null 이나 isNaN 체크는 똑같이 해주면 됩니다!
    const orgId = useRecoilValue(orgIdParamState);
    // const orgId = useRouterIdParamState('orgId', orgIdParamState);

    useEffect(() => {
        if (!orgId && isNaN(orgId)) return; // TODO: [to.진경님] 이렇게 조건에 따라 흐름을 끊어주는 소위 '가드 구문'은, 아래에 개행 하나를 붙여주세요 (이거 혹시 eslint 나 prettier 설정이 있던가요?)
        creditCardApi.index(orgId).then((res) => setCreditCardList(res.data.items));
    }, []);

    return (
        <ul>
            {creditCardList.length ? (
                <>
                    {/*TODO: [to.진경님] 아래에 setCreditCardList 속성 타입(리액트훅)과, setCreditCardList 함수 타입(리코일)이 다릅니다. */}
                    {/*TODO: [to.진경님] setCreditCardList 함수는 리코일 Setter 이므로, 딱히 CardItem 으로 외부에서 주입해서 넘겨주지 않더라도, CardItem 내에서 자체적으로 'const setCreditCardList = useSetRecoilState(creditCardListAtom)' 와 같이 얻을 수 있습니다. */}
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
