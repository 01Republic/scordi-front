import React, {memo} from 'react';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CreditCardDto} from '^models/CreditCard/type';
import {FaQuestion, FaRegCreditCard} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';

/**
 * 카드 프로필 : 기본
 */

interface CreditCardProfileProps {
    item: CreditCardDto;
}

export const CreditCardProfile = memo((props: CreditCardProfileProps) => {
    const {item: creditCard} = props;
    const randomNumber = (creditCard.name || '').length + creditCard.id;
    const colorClass = getColor(randomNumber, palette.notionColors);

    return <TagUI className={colorClass}>{creditCard.name}</TagUI>;
});
CreditCardProfile.displayName = 'CreditCardProfile';

/**
 * 카드 프로필 : 태그형
 */

interface CreditCardProfileTagProps {
    item: CreditCardDto;
}

export const CreditCardProfileTag = memo((props: CreditCardProfileTagProps) => {
    const {item: creditCard} = props;
    const randomNumber = (creditCard.name || '').length + creditCard.id;
    const colorClass = getColor(randomNumber, palette.notionColors);

    return <TagUI className={colorClass}>{creditCard.name}</TagUI>;
});
CreditCardProfileTag.displayName = 'CreditCardProfileTag';

/**
 * 카드 프로필 : 썸네일형
 */

interface CreditCardProfileOptionProps {
    item: CreditCardDto;
    placeholder?: string;
}

export const CreditCardProfileOption = memo((props: CreditCardProfileOptionProps) => {
    const {item: creditCard, placeholder} = props;

    const randomNumber = (creditCard.name || '').length + creditCard.id;
    const colorClass = getColor(randomNumber, palette.notionColors);
    const endNumber = creditCard.secretInfo.number4;

    return (
        <div className={`flex items-center gap-2 py-1 px-3 -mx-3 text-gray-700 group-hover:text-scordi`}>
            <Avatar className="w-7">
                <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
            </Avatar>

            <div className="flex flex-col gap-0.5">
                <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                    <span className="whitespace-nowrap w-[198px] overflow-hidden" style={{textOverflow: 'ellipsis'}}>
                        {creditCard.name}
                    </span>
                </p>
                {endNumber && (
                    <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                        끝자리: <span>{endNumber || '알수없음'}</span>
                    </p>
                )}
            </div>
        </div>
    );
});
CreditCardProfileOption.displayName = 'CreditCardProfileOption';
