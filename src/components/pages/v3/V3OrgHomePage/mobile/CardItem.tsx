import React, {Dispatch, memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Avatar} from '^components/Avatar';
import {CreditCardDto, CreditCardSecretInfo} from '^types/credit-cards.type';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';
import {GoKebabHorizontal} from 'react-icons/go';
import {creditCardApi} from '^api/credit-crads.api';

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

    // 카드 삭제 함수
    const deleteCreditCard = (cardId: number) => {
        if (!orgId && !cardId) return;

        alert('카드를 삭제하시겠습니까?');
        creditCardApi.destory(orgId, cardId).then(() =>
            setCreditCardList((cards) => {
                const remainCards = cards.filter((card) => {
                    return card.id !== cardId;
                });
                return [...remainCards];
            }),
        );
    };

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

            {/* 카드 페이지에서만 삭제 가능 (홈에서 삭제 불가능) */}
            {isCardsPage && (
                <div className="dropdown dropdown-end">
                    <GoKebabHorizontal size={16} tabIndex={0} />

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <span onClick={() => deleteCreditCard(card.id)} className="text-error">
                                삭제
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    );
});
