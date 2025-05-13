import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {InstitutionOption} from './InstitutionOption';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';

interface BankSelectorProps {}

export const BankSelector = memo((props: BankSelectorProps) => {
    const {} = props;
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedBanks, setSelectedBanks] = useState<BankAccountsStaticData[]>([]);
    const clientType = getValues('clientType') || CodefCustomerType.Business;

    const banks = BankAccountsStaticData.findByClientType(clientType);

    const handleSelectBank = (bank: BankAccountsStaticData) => {
        if (selectedBanks.some((b) => b.param === bank.param)) {
            setSelectedBanks(selectedBanks.filter((b) => b.param !== bank.param));
        } else {
            setSelectedBanks([...selectedBanks, bank]);
        }
    };

    const handleSelectAllBanks = () => {
        if (selectedBanks.length === BankAccountsStaticData.findByClientType(clientType).length) {
            setSelectedBanks([]);
        } else {
            setSelectedBanks(BankAccountsStaticData.findByClientType(clientType));
        }
    };

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">은행</h2>
                <AllSelectInstitutionOptions
                    isAllSelected={selectedBanks.length === banks.length}
                    onClick={handleSelectAllBanks}
                />
            </div>
            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {banks.map((bank) => (
                    <InstitutionOption
                        key={bank.param}
                        logo={bank.logo}
                        title={bank.displayName}
                        isSelected={selectedBanks.some((b) => b.param === bank.param)}
                        onClick={() => handleSelectBank(bank)}
                    />
                ))}
            </div>
        </section>
    );
});
