import Tippy from '@tippyjs/react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {Info} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface InvoiceAccountTableHeaderProps extends ListTableHeaderProps {
    //
}

export const InvoiceAccountTableHeader = memo((props: InvoiceAccountTableHeaderProps) => {
    const {t} = useTranslation('assets');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/*이름*/}
            <SortableTH sortKey="[googleTokenData][name]" onClick={orderBy}>
                {t('invoiceAccount.list.table.header.profile') as string}
            </SortableTH>

            {/* 상태 (editable, sortable) */}
            <th>{t('invoiceAccount.list.table.header.status') as string}</th>

            {/*구독 수*/}
            <th>{t('invoiceAccount.list.table.header.subscriptions') as string}</th>

            {/*등록방식*/}
            <th className="flex gap-2 items-center justify-center">
                {t('invoiceAccount.list.table.header.registrationMethod') as string}
                <Tippy content={t('invoiceAccount.list.table.header.registrationMethodTooltip') as string}>
                    <div>
                        <Info fontSize={14} className="text-gray-400" />
                    </div>
                </Tippy>
            </th>

            {/*팀*/}
            <th>{t('invoiceAccount.list.table.header.team') as string}</th>

            {/*담당자*/}
            {/*<th>담당자</th>*/}

            {/* 비고 */}
            <th>{t('invoiceAccount.list.table.header.memo') as string}</th>
        </tr>
    );
});
InvoiceAccountTableHeader.displayName = 'InvoiceAccountTableHeader';
