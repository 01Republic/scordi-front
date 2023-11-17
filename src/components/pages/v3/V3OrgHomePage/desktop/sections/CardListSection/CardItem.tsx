import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {Avatar} from '^components/Avatar';
import {HiOutlineChevronRight} from 'react-icons/hi';
import {useRouter} from 'next/router';
import {V3OrgCardDetailPageRoute} from '^pages/v3/orgs/[orgId]/cards/[cardId]';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

interface CardItemProps {
    idx: number;
    card: CreditCardDto;
}

export const CardItem2 = memo((props: CardItemProps) => {
    const {idx, card} = props;

    return (
        <div
            className={`${
                idx == 0 ? `` : `border-t`
            } p-3 rounded-[0.75rem] flex items-center gap-4 transition-all hover:bg-gray-100 cursor-pointer`}
        >
            <div>
                <Avatar className="w-12" />
            </div>

            <div className="flex-1">
                <p>
                    {card.name} | {card.numbers.number4}
                </p>
                <p>{card.issuerCompany}</p>
            </div>

            <div>
                <Avatar className="w-10" />
            </div>

            <div>
                <HiOutlineChevronRight size={14} className="text-gray-500" />
            </div>
        </div>
    );
});

export const CardItem = memo((props: CardItemProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const router = useRouter();
    const {idx, card} = props;

    const onClick = () => {
        if (!currentOrg) return;
        router.push(V3OrgCardDetailPageRoute.path(currentOrg.id, card.id));
    };

    return (
        <tr className={`transition-all hover:bg-gray-100 cursor-pointer`} onClick={onClick}>
            <td>
                <div className="flex gap-3 items-center">
                    <Avatar className="w-10" />
                    <p className="relative top-[-1px]">
                        <span className="block text-xs text-gray-500">
                            {card.issuerCompany} ({card.numbers.number4})
                        </span>
                        <span className="block text-sm">{card.name}</span>
                    </p>
                </div>
            </td>

            <td className="min-w-[100px]">
                <p>{card.subscriptions?.length}개</p>
            </td>

            <td className="min-w-[100px]">
                <p>{card.billingHistories?.length}원</p>
            </td>

            <td>
                {card.holdingMember && (
                    <div className="flex gap-2 items-center">
                        <Avatar className="w-6" src={card.holdingMember.profileImgUrl || ''} />
                        <p className="relative top-[-1px]">
                            <span className="block text-sm">{card.holdingMember.name}</span>
                            {/*<span className="block text-xs text-gray-500">{card.holdingMember.email}</span>*/}
                        </p>
                    </div>
                )}
            </td>
        </tr>
    );
});
CardItem.displayName = 'CardItem';
