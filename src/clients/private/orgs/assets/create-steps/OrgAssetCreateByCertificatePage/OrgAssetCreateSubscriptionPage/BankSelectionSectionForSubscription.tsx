import { BankAccountsStaticData } from "^models/CodefAccount/bank-account-static-data";
import { memo } from "react";
import { SelectAllToggle } from "../SelectAllToggle";
import { BankOrCardForSubscription } from './BankOrCardForSubscription';

interface BankSelectionSectionForSubscriptionProps {
    selectedBanks: BankAccountsStaticData[];
    onSelect: (bank: BankAccountsStaticData) => void;
    onSelectAll: () => void;
    canSelect: boolean;
}

export const BankSelectionSectionForSubscription = memo((props: BankSelectionSectionForSubscriptionProps) => {
    const { selectedBanks, onSelect, onSelectAll, canSelect } = props;
    const banks = BankAccountsStaticData.findByPersonal(false);

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between py-4">
                <h2 className="leading-none text-xl font-semibold mb-2">계좌</h2>
                {canSelect && (
                    <SelectAllToggle
                        isAllSelected={selectedBanks.length === banks.length}
                        onClick={onSelectAll}
                        label="계좌 전체 선택"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {banks.map((bank) => (
                    <BankOrCardForSubscription
                        key={bank.param}
                        logo={bank.logo}
                        title={bank.displayName}
                        isSelected={selectedBanks.some((b) => b.param === bank.param)}
                        onClick={() => canSelect && onSelect(bank)}
                    />
                ))}
            </div>
        </div>
    );
});

BankSelectionSectionForSubscription.displayName = 'BankSelectionSectionForSubscription';