import React, {Dispatch, memo, SetStateAction} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {bankAccountsStaticData, BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';

interface SuccessConnectBankSelectorProps {
    companies?: BankAccountsStaticData[];
    selectedCodefBanks: CodefBankAccountDto[];
    setSelectedCodefBanks: Dispatch<SetStateAction<CodefBankAccountDto[]>>;
}

export const SuccessConnectBankSelector = memo((props: SuccessConnectBankSelectorProps) => {
    const {companies = [], selectedCodefBanks = [], setSelectedCodefBanks} = props;

    const orgId = useOrgIdParam();
    const {data: codefBankAccounts, isFetching} = useCodefBankAccountsByCompanies(orgId, companies);

    const isAllSelected = codefBankAccounts.length > 0 && selectedCodefBanks.length === codefBankAccounts.length;
    const handleSelectAll = () => setSelectedCodefBanks(isAllSelected ? [] : codefBankAccounts);

    const handleToggle = (item: CodefBankAccountDto) => {
        setSelectedCodefBanks((prev) => {
            return prev.some(({id}) => id === item.id) // included?
                ? prev.filter(({id}) => id !== item.id) // remove
                : [...prev, item]; // add
        });
    };

    return (
        <ContentSection
            text="계좌"
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isFetching}
        >
            <ul className="grid grid-cols-2 gap-3">
                {codefBankAccounts.map((codefBankAccount) => {
                    const bankAccount = codefBankAccount.account?.company;
                    const companyLogo = bankAccountsStaticData.find((data) => data.displayName === bankAccount);

                    return (
                        <ConnectedItem
                            key={codefBankAccount.id}
                            mainText={codefBankAccount.resAccountName || ''}
                            subText={codefBankAccount.bankEndNumbers}
                            url={companyLogo?.logo}
                            icon={<Landmark className="w-full h-full text-white" />}
                            isSelected={selectedCodefBanks.some((codefBank) => codefBank.id === codefBankAccount.id)}
                            onClick={() => handleToggle(codefBankAccount)}
                        />
                    );
                })}
            </ul>
        </ContentSection>
    );
});
