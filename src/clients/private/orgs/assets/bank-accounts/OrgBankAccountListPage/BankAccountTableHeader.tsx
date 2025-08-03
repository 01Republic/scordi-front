import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface BankAccountTableHeaderProps extends ListTableHeaderProps {}

export const BankAccountTableHeader = memo((props: BankAccountTableHeaderProps) => {
    const {t} = useTranslation('assets');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* 은행 프로필 */}
            <SortableTH sortKey="[name]" onClick={orderBy}>
                {t('bankAccount.list.table.header.profile') as string}
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <SortableTH sortKey="[usingStatus]" onClick={orderBy}>
                {t('bankAccount.list.table.header.status') as string}
            </SortableTH>

            {/* 은행명 */}
            <th>{t('bankAccount.list.table.header.bank') as string}</th>

            {/* 구분(법인/개인) */}
            <th>{t('bankAccount.list.table.header.type') as string}</th>

            {/* 연결된 카드 */}
            <th>{t('bankAccount.list.table.header.connectedCards') as string}</th>

            {/* 관리자 */}
            <th>{t('bankAccount.list.table.header.member') as string}</th>

            {/* 비고 */}
            <th>{t('bankAccount.list.table.header.memo') as string}</th>
        </tr>
    );
});
BankAccountTableHeader.displayName = 'BankAccountTableHeader';
