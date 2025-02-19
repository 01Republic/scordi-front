import {memo, useRef, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaCheck} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';

interface ConnectableCardItemProps {
    cardCompany: CardAccountsStaticData;
    codefCard: CodefCardDto;
    onClick?: (codefCard: CodefCardDto) => any;
    onMerge?: (codefCard: CodefCardDto) => any;
    checked?: boolean;
}

export const ConnectableCardItem = memo((props: ConnectableCardItemProps) => {
    const {cardCompany, codefCard, onClick, onMerge, checked} = props;
    const ref = useRef(null);

    const isConnected = !!codefCard.creditCardId;
    const isMergeAllowed = !!onMerge;

    return (
        <div
            ref={ref}
            {...(isConnected && !isMergeAllowed ? {tabIndex: 0} : {})}
            className={`flex items-center py-2 px-3 -mx-3 rounded-lg transition-all group ${
                !isConnected
                    ? 'cursor-pointer hover:bg-scordi-50'
                    : isMergeAllowed
                    ? 'cursor-pointer hover:bg-scordi-50'
                    : 'opacity-30'
            }`}
            onClick={() => {
                isConnected ? onMerge && onMerge(codefCard) : onClick && onClick(codefCard);
            }}
        >
            {isConnected && isMergeAllowed && (
                <Tippy
                    className="text-12 bg-indigo-200 text-scordi"
                    content={
                        <div className="text-12 flex flex-col items-center gap-0">
                            <span>다른 카드에 연결되어 있지만</span>
                            <span>병합할 수 있어요</span>
                        </div>
                    }
                    reference={ref}
                />
            )}
            <div className="flex items-center gap-2">
                <div>
                    <img src={cardCompany.logo} alt={codefCard.resCardName} className="avatar w-8 h-8" loading="lazy" />
                </div>

                <div>
                    <p className="text-14 font-medium leading-none mb-0.5">{codefCard.resCardName}</p>
                    <p className="text-12 leading-none text-gray-400">{codefCard.resCardNo}</p>
                </div>
            </div>
            <div className="ml-auto pr-1.5">
                {!isConnected ? (
                    ''
                ) : isMergeAllowed ? (
                    <TagUI className="bg-green-200" noMargin>
                        연결됨
                    </TagUI>
                ) : (
                    <TagUI className="bg-green-200" noMargin>
                        연결됨
                    </TagUI>
                )}
            </div>
            <div>{checked && <FaCheck className="text-scordi" />}</div>
        </div>
    );
});
ConnectableCardItem.displayName = 'ConnectableCardItem';
