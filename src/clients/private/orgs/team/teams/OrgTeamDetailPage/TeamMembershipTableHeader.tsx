import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface TeamMembershipTableHeaderProps extends ListTableHeaderProps {}

export const TeamMembershipTableHeader = memo((props: TeamMembershipTableHeaderProps) => {
    const {t} = useTranslation('teams');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <SortableTH sortKey="[teamMember][name]" onClick={orderBy}>
                {t('members.table.name')}
            </SortableTH>

            <th>{t('members.table.email')}</th>
            <th>{t('members.table.phone')}</th>

            {/* 이용 앱 수 */}
            <SortableTH sortKey="[teamMember][subscriptionCount]" sortVal="DESC" onClick={orderBy}>
                {t('members.table.subscriptionCount')}
            </SortableTH>

            {/*/!* 권한 *!/*/}
            {/*<th />*/}
            {/*<SortableTH sortKey="[membership][level]" onClick={onSort} className="justify-center">*/}
            {/*    권한*/}
            {/*</SortableTH>*/}

            {/* Actions */}
            <th />
        </tr>
    );
});
TeamMembershipTableHeader.displayName = 'TeamMembershipTableHeader';
