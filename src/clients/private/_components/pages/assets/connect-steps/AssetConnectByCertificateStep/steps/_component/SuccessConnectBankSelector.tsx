import {memo, useState} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {ConnectedItem} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectedItem';
import {ContentSection} from '^_components/pages/assets/connect-steps/common/ContentSection';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {useCodefBankAccountsByCompanies} from '^models/CodefBankAccount/hook';
import {unitFormat} from '^utils/number';
import Tippy from '@tippyjs/react';

interface SuccessConnectBankSelectorProps {
    companies?: BankAccountsStaticData[];
    onSelect?: (codefBanks: CodefBankAccountDto[]) => any;
}

export const SuccessConnectBankSelector = memo((props: SuccessConnectBankSelectorProps) => {
    const orgId = useOrgIdParam();
    const [selectedItems, setSelectedItems] = useState<CodefBankAccountDto[]>([]);
    const {companies = [], onSelect} = props;

    const {data: codefBankAccounts, isFetching} = useCodefBankAccountsByCompanies(orgId, companies);

    const select = (changedItems: CodefBankAccountDto[]) => {
        setSelectedItems(changedItems);
        onSelect && onSelect(changedItems);
    };

    const isAllSelected = codefBankAccounts.length > 0 && selectedItems.length === codefBankAccounts.length;
    const handleSelectAll = () => select(isAllSelected ? [] : codefBankAccounts);

    const handleToggle = (item: CodefBankAccountDto) => {
        const changedItems = selectedItems.some(({id}) => id === item.id) // included?
            ? selectedItems.filter(({id}) => id !== item.id) // remove
            : [...selectedItems, item]; // add

        select(changedItems);
    };

    return (
        <ContentSection
            text={
                <span className="flex items-center gap-1">
                    계좌 <small className="text-scordi font-bold">({unitFormat(codefBankAccounts.length, '')})</small>
                </span>
            }
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isFetching}
        >
            <ul className="grid grid-cols-2 gap-3">
                {codefBankAccounts.map((codefBankAccount) => (
                    <ConnectedItem
                        key={codefBankAccount.id}
                        mainText={codefBankAccount.resAccountName || ''}
                        subText={
                            <Tippy content={codefBankAccount.resAccountDisplay} className="!text-12">
                                <div>
                                    <span>끝자리: {codefBankAccount.bankEndNumbers}</span>
                                </div>
                            </Tippy>
                        }
                        url={codefBankAccount.company?.logo}
                        icon={<Landmark className="w-full h-full text-white" />}
                        onClick={() => handleToggle(codefBankAccount)}
                        isSelected={selectedItems.some(({id}) => id === codefBankAccount.id)}
                        isDisabled={!!codefBankAccount.bankAccountId}
                        comment={codefBankAccount.bankAccountId ? '연결된 계좌' : ''}
                    />
                ))}
            </ul>
        </ContentSection>
    );
});
