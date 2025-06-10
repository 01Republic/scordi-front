import {memo, useState} from 'react';
import {Landmark} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {unitFormat} from '^utils/number';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {ContentSection} from '../../../common/ContentSection';
import {ConnectedItem} from '../../../AssetConnectSuccessPageTemplate/ConnectedItem';

interface Props {
    codefBankAccounts: CodefBankAccountDto[];
    isLoading?: boolean;
    onSelect?: (codefBanks: CodefBankAccountDto[]) => any;
}

export const SuccessConnectBankSelector = memo((props: Props) => {
    const {codefBankAccounts = [], isLoading = false, onSelect} = props;
    const selectables = codefBankAccounts.filter((codefBankAccount) => !codefBankAccount.bankAccountId);
    const [selectedItems, setSelectedItems] = useState(selectables);

    const select = (items: CodefBankAccountDto[]) => {
        setSelectedItems(items);
        onSelect && onSelect(items);
    };

    const isAllSelected = codefBankAccounts.length > 0 && selectedItems.length === selectables.length;
    const handleSelectAll = () => select(isAllSelected ? [] : selectables);

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
            handleSelectAll={selectables.length > 0 ? handleSelectAll : undefined}
            isLoading={isLoading}
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
