import React, {memo} from 'react';
import {FaRegCreditCard} from 'react-icons/fa6';
import {getColor, palette} from '^components/util/palette';
import {Avatar} from '^components/Avatar';
import {NextImage} from '^components/NextImage';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CreditCardDto} from '^models/CreditCard/type';

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
    const endNumber = creditCard.secretInfo?.number4;

    return (
        <div
            data-component="CreditCardProfileOption"
            className={`flex items-center gap-2 py-1 text-gray-700 group-hover:text-scordi max-w-60 overflow-x-hidden`}
        >
            {creditCard ? (
                <>
                    <Avatar className="w-7">
                        <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
                    </Avatar>

                    <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                        <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                            <span className="truncate">{creditCard.name}</span>
                        </p>
                        {endNumber && (
                            <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                끝자리: <span>{endNumber || '알수없음'}</span>
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
});

/**
 * 카드 프로필 : 썸네일형2
 */

interface CreditCardProfileOption2Props {
    item: CreditCardDto;
    placeholder?: string;
}

export const CreditCardProfileOption2 = memo((props: CreditCardProfileOption2Props) => {
    const {item: creditCard, placeholder} = props;

    const randomNumber = (creditCard.name || '').length + creditCard.id;
    const colorClass = getColor(randomNumber, palette.notionColors);
    const endNumber = creditCard.secretInfo?.number4;
    const company = creditCard.company;

    return (
        <div
            data-component="CreditCardProfileOption"
            className={`flex items-center gap-2 py-1 text-gray-700 group-hover:text-scordi max-w-60 overflow-x-hidden`}
        >
            {creditCard ? (
                <>
                    <Avatar className="w-7">
                        {company ? (
                            <img src={company.logo} alt="" />
                        ) : (
                            <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
                        )}
                    </Avatar>

                    <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                        <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                            <span className="truncate">{creditCard.name}</span>
                        </p>
                        {endNumber && (
                            <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                끝자리: <span>{endNumber || '알수없음'}</span>
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
});
CreditCardProfileOption2.displayName = 'CreditCardProfileOption2';

interface CreditCardProfileCompactProps {
    item?: CreditCardDto;
    className?: string;
}

export const CreditCardProfileCompact = memo((props: CreditCardProfileCompactProps) => {
    const {item: creditCard, className = ''} = props;
    if (!creditCard) return <div className="text-13 text-gray-300">비어있음</div>;

    const cardName = creditCard.profileName;
    const endNumber = creditCard.secretInfo.number4;
    const company = creditCard.company;

    return (
        <div
            data-component="CreditCardProfileCompact"
            className={`h-[20px] flex gap-1.5 items-center max-w-sm ${className}`}
        >
            <Avatar className="w-[20px] h-[20px] text-12 relative">
                {company ? (
                    <NextImage src={company.logo} alt={company.displayName} fill />
                ) : (
                    <FaRegCreditCard size={12} className="h-full w-full p-1 text-gray-400" />
                )}
            </Avatar>

            <div className="overflow-hidden text-left">
                <p className="text-14 leading-none overflow-x-hidden max-w-full whitespace-nowrap">
                    <span className="truncate">{cardName}</span>
                    {endNumber && <span className="">({endNumber})</span>}
                </p>
            </div>
        </div>
    );
});
