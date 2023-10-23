import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Avatar} from '^components/Avatar';
import {CardItemDropDown} from '../../V3OrgCardDetailPage/CardItemDropDown';
import {CreditCardDto} from '^types/credit-cards.type';

interface CardItemProps {
    card: CreditCardDto;
}

export const CardItem = memo((props: CardItemProps) => {
    const {card} = props;

    const [isCardsPage, setIsCardsPage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.pathname.includes('cards') && setIsCardsPage(true);
    }, []);

    return (
        <li className="!w-auto gap-4 px-5 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            {/* TODO: 카드사 이미지 띄워주기 */}
            <Avatar className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-sm text-gray-500">
                    {card.name} / {card.issuerCompany}
                </p>
                <p className="font-semibold">{card.sign}</p>
            </div>

            {/* 카드 페이지에서만 삭제 가능 (홈에서 삭제 불가능) */}
            {isCardsPage && <CardItemDropDown />}
        </li>
    );
});
