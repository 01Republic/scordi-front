import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountProfileOption2} from '^models/BankAccount/components/BankAccountProfile';
import {BankAccountDto, BankAccountUsingStatus, UpdateBankAccountRequestDto} from '^models/BankAccount/type';
import {CreditCardProfileCompact, IsPersonalTag, UsingStatusTag} from '^models/CreditCard/components';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {OrgBankAccountShowPageRoute} from '^pages/orgs/[id]/bankAccounts/[bankAccountId]';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {toast} from 'react-hot-toast';

interface BankAccountTableRowProps {
    bankAccount: BankAccountDto;
    reload?: () => any;
}

export const BankAccountTableRow = memo((props: BankAccountTableRowProps) => {
    const {t} = useTranslation('assets');
    const {bankAccount, reload} = props;

    const update = async (dto: UpdateBankAccountRequestDto) => {
        const {id, organizationId: orgId} = bankAccount;
        return bankAccountApi
            .update(orgId, id, dto)
            .then(() => toast.success(t('bankAccount.messages.saveSuccess') as string))
            .catch(() => toast.error(t('bankAccount.messages.saveError') as string))
            .finally(() => reload && reload());
    };

    const company = bankAccount.company;
    // const expiry = bankAccount.decryptSign().expiry;

    const showPagePath = OrgBankAccountShowPageRoute.path(bankAccount.organizationId, bankAccount.id);

    return (
        <tr className="group">
            {/* 카드 프로필 */}
            <td>
                <OpenButtonColumn href={showPagePath}>
                    <BankAccountProfileOption2 item={bankAccount} />
                </OpenButtonColumn>
            </td>

            {/* 상태 (editable, sortable) */}
            <td>
                <SelectColumn
                    value={bankAccount.usingStatus}
                    getOptions={async () => [
                        BankAccountUsingStatus.UnDef,
                        BankAccountUsingStatus.NoUse,
                        BankAccountUsingStatus.InUse,
                        BankAccountUsingStatus.Expired,
                    ]}
                    onSelect={async (usingStatus: BankAccountUsingStatus) => {
                        if (usingStatus === bankAccount.usingStatus) return;
                        return update({usingStatus});
                    }}
                    ValueComponent={UsingStatusTag}
                    contentMinWidth="240px"
                    optionListBoxTitle={t('bankAccount.modals.changeStatus.title') as string}
                    inputDisplay={false}
                />
            </td>

            {/* 은행명 */}
            <td>
                {company ? (
                    <div className="text-14">
                        <span>{company.displayName.replace('은행', '')}</span>
                    </div>
                ) : (
                    <i className="text-gray-300">-</i>
                )}
            </td>

            {/* 구분(법인/개인) */}
            <td>
                <SelectColumn
                    value={bankAccount.isPersonal}
                    getOptions={async () => [true, false]}
                    onSelect={async (isPersonal: boolean) => {
                        if (isPersonal === bankAccount.isPersonal) return;
                        return update({isPersonal});
                    }}
                    ValueComponent={IsPersonalTag}
                    contentMinWidth="240px"
                    optionListBoxTitle={t('bankAccount.list.table.header.type') as string}
                    inputDisplay={false}
                />
            </td>

            {/* 연결된 카드 */}
            <td>
                {bankAccount.creditCards && bankAccount.creditCards?.length > 0 ? (
                    <span className={'whitespace-nowrap flex items-center gap-1 text-sm'}>
                        <CreditCardProfileCompact className={'inline-flex'} item={bankAccount.creditCards[0]} />
                        {bankAccount.creditCards.length > 1 && `외 ${bankAccount.creditCards.length - 1}개`}
                    </span>
                ) : (
                    <i className="text-gray-300">-</i>
                )}
            </td>

            {/* 관리자 */}
            <td>
                <TeamMemberSelectColumn
                    compactView
                    defaultValue={bankAccount.holdingMember || undefined}
                    onChange={async (holdingMember) => {
                        if (bankAccount.holdingMemberId === holdingMember?.id) return;
                        return update({holdingMemberId: holdingMember?.id || null});
                    }}
                    optionListBoxTitle={t('bankAccount.list.table.header.member') as string}
                    detachableOptionBoxTitle={t('bankAccount.list.table.header.member') as string}
                />
            </td>

            {/* 비고 */}
            <td>
                <AirInputText
                    defaultValue={bankAccount.memo || undefined}
                    onChange={async (memo) => {
                        if (bankAccount.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>
        </tr>
    );
});
BankAccountTableRow.displayName = 'BankAccountTableRow';
