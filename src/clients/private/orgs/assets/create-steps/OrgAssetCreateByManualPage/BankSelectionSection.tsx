import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {CreateBankAccountRequestDto} from '^models/BankAccount/type';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {InstitutionOption} from '^_components/pages/assets/connect-steps/common/InstitutionOption';
import {BankManualForm} from '^clients/private/orgs/assets/create-steps/OrgAssetCreateByManualPage/BankManualForm';
import {SelectedCompany} from '^clients/private/orgs/assets/create-steps/common/SelectedCompany';

interface BankSelectionSectionProps {
    onSelect: (bank: BankAccountsStaticData | null) => void;
    selectedBank: BankAccountsStaticData | null;
    isPersonal: boolean;
}

export const BankSelectionSection = memo((props: BankSelectionSectionProps) => {
    const {onSelect, selectedBank, isPersonal} = props;
    const form = useForm<CreateBankAccountRequestDto>({
        mode: 'onChange',
    });

    const companies = BankAccountsStaticData.findByPersonal(isPersonal);

    const handleBankSelect = (bank: BankAccountsStaticData) => {
        if (selectedBank?.param === bank.param) {
            onSelect(null);
        } else {
            onSelect(bank);
        }
    };

    if (!selectedBank) {
        return (
            <section className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-neutral-900">은행</h2>
                <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {companies.map((company) => (
                        <InstitutionOption
                            key={company.param}
                            logo={company.logo}
                            title={company.displayName}
                            onClick={() => handleBankSelect(company)}
                        />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <div className="w-full flex flex-col gap-5">
            <section className="flex flex-col gap-10">
                <StatusHeader
                    title="계좌를 등록해주세요."
                    onClick={() => {
                        onSelect(null);
                        form.reset();
                    }}
                />
                <SelectedCompany
                    companyType="은행"
                    selectedCompany={selectedBank.displayName}
                    onChange={() => {
                        onSelect(null);
                        form.reset();
                    }}
                />
            </section>
            <BankManualForm selectedBank={selectedBank} isPersonal={isPersonal} />
        </div>
    );
});
