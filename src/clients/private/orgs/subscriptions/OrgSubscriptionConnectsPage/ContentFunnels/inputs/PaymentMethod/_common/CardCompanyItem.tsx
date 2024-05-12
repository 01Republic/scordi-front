import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import React, {memo} from 'react';
import {FaChevronRight} from 'react-icons/fa6';

interface CardCompanyItemProps {
    cardCompanyData: CardAccountsStaticData;
    onClick: () => any;
}

export const CardCompanyItem = memo((props: CardCompanyItemProps) => {
    const {cardCompanyData, onClick} = props;
    const {logo, displayName} = cardCompanyData;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-2 rounded-btn cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div>
                <img src={logo} alt="" className="avatar w-[28px] h-[28px]" />
            </div>
            <div className="flex-auto px-3">
                <p className="text-14">{displayName}</p>
            </div>
            <div>
                <FaChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
});
CardCompanyItem.displayName = 'CardCompanyItem';
