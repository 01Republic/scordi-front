import React, {memo} from 'react';
import {FaRegCreditCard} from 'react-icons/fa6';
import {getColor, palette} from '^components/util/palette';
import {Avatar} from '^components/Avatar';
import {NextImage} from '^components/NextImage';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {RiBankFill} from '@react-icons/all-files/ri/RiBankFill';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';

/**
 * 계좌 프로필 : 기본
 */

interface BankAccountProfileProps {
    item: BankAccountDto;
}

export const BankAccountProfile = memo((props: BankAccountProfileProps) => {
    const {item: bankAccount} = props;
    const randomNumber = (bankAccount.name || '').length + bankAccount.id;
    const colorClass = getColor(randomNumber, palette.notionColors);

    return <TagUI className={colorClass}>{bankAccount.name}</TagUI>;
});
BankAccountProfile.displayName = 'BankAccountProfile';

/**
 * 계좌 프로필 : 태그형
 */

interface BankAccountProfileTagProps {
    item: BankAccountDto;
}

export const BankAccountProfileTag = memo((props: BankAccountProfileTagProps) => {
    const {item: bankAccount} = props;
    const randomNumber = (bankAccount.name || '').length + bankAccount.id;
    const colorClass = getColor(randomNumber, palette.notionColors);

    return <TagUI className={colorClass}>{bankAccount.name}</TagUI>;
});
BankAccountProfileTag.displayName = 'BankAccountProfileTag';

/**
 * 계좌 프로필 : 썸네일형
 */

interface BankAccountProfileOptionProps {
    item: BankAccountDto;
    placeholder?: string;
}

// export const BankAccountProfileOption = memo((props: BankAccountProfileOptionProps) => {
//     const {item: bankAccount, placeholder} = props;
//
//     const randomNumber = (bankAccount.name || '').length + bankAccount.id;
//     const colorClass = getColor(randomNumber, palette.notionColors);
//     const endNumber = bankAccount.secretInfo?.number4;
//
//     return (
//         <div
//             data-component="CreditCardProfileOption"
//             className={`flex items-center gap-2 py-1 text-gray-700 group-hover:text-scordi max-w-60 overflow-x-hidden`}
//         >
//             {bankAccount ? (
//                 <>
//                     <Avatar className="w-7">
//                         <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
//                     </Avatar>
//
//                     <div className="flex flex-col gap-0.5 overflow-hidden text-left">
//                         <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
//                             <span className="truncate">{bankAccount.name}</span>
//                         </p>
//                         {endNumber && (
//                             <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
//                                 끝자리: <span>{endNumber || '알수없음'}</span>
//                             </p>
//                         )}
//                     </div>
//                 </>
//             ) : (
//                 <></>
//             )}
//         </div>
//     );
// });

/**
 * 카드 프로필 : 썸네일형2
 */

interface BankAccountProfileOption2Props {
    item: BankAccountDto;
    placeholder?: string;
    subtextMethod?: 'fullNumber' | 'endNumber'; // default: 'fullNumber'
}

export const BankAccountProfileOption2 = memo((props: BankAccountProfileOption2Props) => {
    const {item: bankAccount, placeholder, subtextMethod = 'fullNumber'} = props;

    const randomNumber = (bankAccount.name || '').length + bankAccount.id;
    const colorClass = getColor(randomNumber, palette.notionColors);
    const endNumber = bankAccount.endNumber();
    const company = bankAccount.company;
    const bankName = bankAccount.bankName;

    return (
        <div
            data-component="CreditCardProfileOption"
            className={`flex items-center gap-2 py-1 text-gray-700 group-hover:text-scordi max-w-60 overflow-x-hidden`}
        >
            {bankAccount ? (
                <>
                    <Avatar className="w-7">
                        {company ? (
                            <img src={company.logo} alt={company.displayName || ''} />
                        ) : (
                            <RiBankFill size={20} className="h-full w-full p-[6px]" />
                        )}
                    </Avatar>

                    <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                        <p className={`flex gap-2 items-center group-hover:text-scordi leading-none`}>
                            <span className="truncate">{bankAccount.title}</span>
                        </p>
                        {bankAccount.displayNumber &&
                            (subtextMethod === 'fullNumber' ? (
                                <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                    <span>{bankAccount.displayNumber || '(알수없음)'}</span>
                                </p>
                            ) : (
                                endNumber && (
                                    <p className="block text-xs font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                                        끝자리: <span>{endNumber || '(알수없음)'}</span>
                                    </p>
                                )
                            ))}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
});
BankAccountProfileOption2.displayName = 'CreditCardProfileOption2';

interface BankAccountProfileCompactProps {
    item?: BankAccountDto;
    className?: string;
}

export const BankAccountProfileCompact = memo((props: BankAccountProfileCompactProps) => {
    const {item: bankAccount, className = ''} = props;
    if (!bankAccount) return <div className="text-13 text-gray-300">비어있음</div>;

    const bank = bankAccount.bank;

    return (
        <div
            data-component="CreditCardProfileCompact"
            className={`h-[20px] flex gap-1.5 items-center max-w-sm ${className}`}
        >
            <Avatar className="w-[20px] h-[20px] text-12 relative">
                {bank ? (
                    // TODO: 로고 이미지
                    // <NextImage src={company.logo} alt={company.displayName} fill />
                    <FaRegCreditCard size={12} className="h-full w-full p-1 text-gray-400" />
                ) : (
                    <FaRegCreditCard size={12} className="h-full w-full p-1 text-gray-400" />
                )}
            </Avatar>

            <div className="flex items-center text-14 leading-none whitespace-nowrap overflow-hidden">
                <span className="truncate">{bankAccount.alias}</span>
            </div>
        </div>
    );
});
