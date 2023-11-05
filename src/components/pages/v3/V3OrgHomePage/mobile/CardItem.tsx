import React, {Dispatch, memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AvatarCard} from '^components/Avatar';
import {CreditCardDto, CreditCardSecretInfo} from '^types/credit-cards.type';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';
import {useRecoilValue} from 'recoil';

interface CardItemProps {
    card: CreditCardDto;
    setCreditCardList: Dispatch<React.SetStateAction<CreditCardDto[]>>;
}

// TODO: [to.진경님] 안쓰이는 변수, 코드, 잘 지워주시면 복이 옵니다!
export const CardItem = memo((props: CardItemProps) => {
    const {card, setCreditCardList} = props;
    const [isCardsPage, setIsCardsPage] = useState(false);
    const [cardInfo, setCardInfo] = useState<CreditCardSecretInfo>();
    const router = useRouter();
    // TODO: [to.진경님] 아래의 useRouterIdParamState 는 라우터에서 'orgId' 값을 가져오는데요,
    //  이건 'orgId' 라는 키에 대하여 페이지에서 1회만 하면 됩니다! ㅋㅋㅋ
    //  나머지는 다음처럼 그냥 useRecoilValue 로 가져오면 좀 더 최적화된 실행이 되구요 (좀 더 상태업데이트를 덜해서),
    //  다만 null 이나 isNaN 체크는 똑같이 해주면 됩니다!
    const orgId = useRecoilValue(orgIdParamState);
    // const orgId = useRouterIdParamState('orgId', orgIdParamState);

    useEffect(() => {
        router.pathname.includes('cards') && setIsCardsPage(true); // TODO: [to.진경님] 요건 뭐에요??
        const json = CryptoJS.AES.decrypt(card.sign, cardSign).toString(CryptoJS.enc.Utf8);
        const toString = JSON.parse(json);

        setCardInfo(toString);
    }, [card.id]);

    return (
        <li className="!w-auto gap-4 px-5 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            {/* TODO: 카드사 이미지 띄워주기 */}
            <AvatarCard className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div onClick={() => router.push(V3OrgCardDetailPageRoute.path(orgId, card.id))} className="flex-1">
                <p className="text-sm text-gray-500 flex">
                    {card.name && <span>{card.name} / </span>}
                    {card.issuerCompany && <span className="pl-1"> {card.issuerCompany} </span>}
                </p>
                <p className="font-semibold">
                    {cardInfo?.number1}-{cardInfo?.number2}-{cardInfo?.number3}-{cardInfo?.number4}
                </p>
            </div>
        </li>
    );
});
