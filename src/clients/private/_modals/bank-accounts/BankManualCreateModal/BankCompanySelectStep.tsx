import React, {memo} from 'react';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {BankCompanyItem} from '^models/CodefAccount/components/BankCompanyItem';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {ChevronLeft} from 'lucide-react';

interface BankCompanySelectStepProps {
    codefClientType: CodefCustomerType;
    onBack: () => any;
    setCompany: (bankCompanyData: BankAccountsStaticData) => any;
}

export const BankCompanySelectStep = memo((props: BankCompanySelectStepProps) => {
    const {codefClientType, onBack, setCompany} = props;

    const BankCompanies = BankAccountsStaticData.clientTypeOf(codefClientType);

    return (
        <div className="h-full flex flex-col">
            <div>
                <div className="mb-4">
                    <ChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi">계좌 직접 추가하기</p>
                <h3 className="font-bold text-xl">
                    어느 은행의 <br />
                    계좌를 등록할까요?
                </h3>
            </div>

            <div className="py-4 flex flex-col flex-1 overflow-y-auto hide-scrollbar">
                {BankCompanies.map((bankCompanyData, i) => (
                    <BankCompanyItem
                        key={i}
                        bankCompanyData={bankCompanyData}
                        onClick={() => setCompany(bankCompanyData)}
                    />
                ))}
            </div>
        </div>
    );
});
BankCompanySelectStep.displayName = 'BankCompanySelectStep';
