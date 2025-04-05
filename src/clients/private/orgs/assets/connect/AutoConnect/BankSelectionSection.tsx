import { BankAccountsStaticData } from "^models/CodefAccount/bank-account-static-data";
import { FinancialInstitutionCard } from './FinancialInstitutionCard';
import { SelectAllToggle } from './SelectAllToggle';

export const BankSelectionSection = ({
    selectedBanks,
    onSelect,
    onSelectAll
}: {
    selectedBanks: BankAccountsStaticData[];
    onSelect: (bank: BankAccountsStaticData) => void;
    onSelectAll: () => void;
}) => {
    const banks = BankAccountsStaticData.findByPersonal(false);
    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <h2 className="leading-none text-xl font-semibold mb-2">은행</h2>
                <SelectAllToggle
                    isAllSelected={selectedBanks.length === banks.length}
                    onClick={onSelectAll}
                    label="은행 전체 선택"
                />
            </div>
            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {banks.map((bank) => (
                    <FinancialInstitutionCard
                        key={bank.param}
                        logo={bank.logo}
                        title={bank.displayName}
                        isSelected={selectedBanks.some((b) => b.param === bank.param)}
                        onClick={() => onSelect(bank)}
                    />
                ))}
            </div>
        </div>
    );
}; 