import {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

type SubscriptionTableHeaderProps = ListTableHeaderProps;

export const SubscriptionTableHeader = memo((props: SubscriptionTableHeaderProps) => {
    const {t} = useTranslation('teams');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* Checkbox */}
            {/*<th className="bg-transparent"></th>*/}
            <SortableTH sortKey="[product][nameKo]" onClick={orderBy}>
                {t('subscriptions.table.service')}
            </SortableTH>

            <SortableTH sortKey="[usedMemberCount]" sortVal="DESC" onClick={orderBy}>
                {t('subscriptions.table.usedMembers')}
            </SortableTH>

            <th>{t('subscriptions.table.note')}</th>
            <th></th>
        </tr>
    );
});
SubscriptionTableHeader.displayName = 'SubscriptionTableHeader';
