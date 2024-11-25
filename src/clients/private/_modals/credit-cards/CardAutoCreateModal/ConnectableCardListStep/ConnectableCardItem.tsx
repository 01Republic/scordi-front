import {memo, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaCheck} from 'react-icons/fa6';

interface ConnectableCardItemProps {
    cardCompany: CardAccountsStaticData;
    codefCard: CodefCardDto;
    onClick?: (codefCard: CodefCardDto) => any;
    checked?: boolean;
}

export const ConnectableCardItem = memo((props: ConnectableCardItemProps) => {
    const {cardCompany, codefCard, onClick, checked} = props;

    const isConnected = !!codefCard.creditCardId;

    return (
        <div
            {...(isConnected ? {tabIndex: 0} : {})}
            className={`flex items-center py-2 px-3 -mx-3 rounded-lg ${
                isConnected ? 'opacity-30' : 'cursor-pointer transition-all group hover:bg-scordi-50'
            }`}
            onClick={() => !isConnected && onClick && onClick(codefCard)}
        >
            <div className="flex items-center gap-2">
                <div>
                    <img src={cardCompany.logo} alt={codefCard.resCardName} className="avatar w-8 h-8" loading="lazy" />
                </div>

                <div>
                    <p className="text-14 font-medium leading-none mb-0.5">{codefCard.resCardName}</p>
                    <p className="text-12 leading-none text-gray-400">{codefCard.resCardNo}</p>
                </div>
            </div>
            <div className="ml-auto">{isConnected && <TagUI className="bg-green-200">연결됨</TagUI>}</div>
            <div>{checked && <FaCheck className="text-scordi" />}</div>
        </div>
    );
});
ConnectableCardItem.displayName = 'ConnectableCardItem';
