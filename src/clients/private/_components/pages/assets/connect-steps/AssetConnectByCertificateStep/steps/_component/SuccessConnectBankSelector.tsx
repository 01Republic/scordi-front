import React, {Dispatch, memo, SetStateAction} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {useFindBankAccounts} from '^models/CodefAccount/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {bankAccountsStaticData, BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

interface SuccessConnectBankSelectorProps {
    bankCreateResponse: {item: BankAccountsStaticData; response: CodefAccountDto}[];
    selectedCodefBanks: CodefBankAccountDto[];
    setSelectedCodefBanks: Dispatch<SetStateAction<CodefBankAccountDto[]>>;
}

export const SuccessConnectBankSelector = memo((props: SuccessConnectBankSelectorProps) => {
    const {bankCreateResponse, selectedCodefBanks, setSelectedCodefBanks} = props;

    const orgId = useOrgIdParam();
    const codefBankAccountIds = bankCreateResponse.map((bankAccount) => bankAccount.response.id);
    const {items: codefBankAccounts, isLoading} = useFindBankAccounts(orgId, codefBankAccountIds);

    if (codefBankAccounts.length === 0) return <></>;

    const isAllSelected = bankCreateResponse.length > 0 && selectedCodefBanks.length === codefBankAccounts.length;
    const handleSelectAll = () => {
        setSelectedCodefBanks(isAllSelected ? [] : codefBankAccounts);
    };

    const handleToggle = (codefBankAccount: CodefBankAccountDto) => {
        setSelectedCodefBanks((prevSelectedCodefBanks) => {
            const isSelected = prevSelectedCodefBanks.some((codefBank) => codefBank.id === codefBankAccount.id);
            if (isSelected) {
                return prevSelectedCodefBanks.filter((codefBank) => codefBank.id !== codefBankAccount.id);
            } else {
                return [...prevSelectedCodefBanks, codefBankAccount];
            }
        });
    };

    return (
        <ContentSection
            text="계좌"
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isLoading}
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
