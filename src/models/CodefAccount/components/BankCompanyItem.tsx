import React, {memo} from 'react';
import {FaChevronRight} from 'react-icons/fa6';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';

interface BankCompanyItemProps {
    bankCompanyData: BankAccountsStaticData;
    onClick: () => any;
}

export const BankCompanyItem = memo((props: BankCompanyItemProps) => {
    const {bankCompanyData, onClick} = props;
    const {logo, displayName} = bankCompanyData;

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
BankCompanyItem.displayName = 'BankCompanyItem';
