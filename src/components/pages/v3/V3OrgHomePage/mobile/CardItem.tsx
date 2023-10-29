import React, {Dispatch, memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Avatar} from '^components/Avatar';
import {CreditCardDto, CreditCardSecretInfo} from '^types/credit-cards.type';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';
import {GoKebabHorizontal} from 'react-icons/go';

interface CardItemProps {
    card: CreditCardDto;
    setCreditCardList: Dispatch<React.SetStateAction<CreditCardDto[]>>;
}

export const CardItem = memo((props: CardItemProps) => {
    const {card, setCreditCardList} = props;
    const [isCardsPage, setIsCardsPage] = useState(false);
    const [cardInfo, setCardInfo] = useState<CreditCardSecretInfo>({});
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);

    useEffect(() => {
        router.pathname.includes('cards') && setIsCardsPage(true);
        const json = CryptoJS.AES.decrypt(card.sign, cardSign).toString(CryptoJS.enc.Utf8);
        const toString = JSON.parse(json);

        setCardInfo(toString);
    }, [card.id]);

    return (
        <li className="!w-auto gap-4 px-5 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            {/* TODO: 카드사 이미지 띄워주기 */}
            <Avatar className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div onClick={() => router.push(V3OrgCardDetailPageRoute.path(orgId, card.id))} className="flex-1">
                <p className="text-sm text-gray-500 flex">
                    {card.name && <span>{card.name} / </span>}
                    {card.issuerCompany && <span>{card.issuerCompany} </span>}
                </p>
                <p className="font-semibold">{`${cardInfo.number1}-${cardInfo.number2}-${cardInfo.number3}-${cardInfo.number4}`}</p>
            </div>
        </li>
    );
});
