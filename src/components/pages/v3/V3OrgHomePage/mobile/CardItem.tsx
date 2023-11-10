import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {AvatarCard} from '^components/Avatar';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {orgIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo} from '^models/CreditCard/credit-cards.type';

interface CardItemProps {
    card: CreditCardDto;
}

export const CardItem = memo((props: CardItemProps) => {
    const {card} = props;
    const [cardInfo, setCardInfo] = useState<CreditCardSecretInfo>();
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        const decrypted = card.decryptSign();

        setCardInfo(decrypted);
    }, [orgId, card]);

    return (
        <li className="!w-auto gap-4 px-5 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            {/* TODO: 카드사 이미지 띄워주기 */}
            <AvatarCard className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div onClick={() => router.push(V3OrgCardDetailPageRoute.path(orgId, card.id))} className="flex-1">
                <p className="text-sm text-gray-500 flex">
                    {card.name && <span>{card.name}</span>}
                    {card.name && card.issuerCompany && <span className="px-1">|</span>}
                    {card.issuerCompany && <span>{card.issuerCompany}</span>}
                </p>
                <p className="font-semibold">
                    {cardInfo?.number1}-{cardInfo?.number2}-{cardInfo?.number3}-{cardInfo?.number4}
                </p>
            </div>
        </li>
    );
});
