import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface TeamMemberInSubscriptionTableHeaderProps {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
    allSelected: boolean;
    onAllSelect: () => any;
}

export const TeamMemberInSubscriptionTableHeader = memo((props: TeamMemberInSubscriptionTableHeaderProps) => {
    const {t} = useTranslation('subscription');
    const {sortVal, orderBy} = props;
    const {allSelected, onAllSelect} = props;

    return (
        <tr className="bg-slate-100">
            <th>
                <input
                    type="checkbox"
                    className="w-4 h-4 focus:ring-0 cursor-pointer"
                    checked={allSelected}
                    onChange={onAllSelect}
                />
            </th>

            <SortableTH2 sortKey="[teamMember][name]" sortVal={sortVal} onClick={orderBy}>
                {t('detail.memberTable.headers.name')}
            </SortableTH2>

            <SortableTH2 sortKey="[teamMember][teams][name]" sortVal={sortVal} onClick={orderBy}>
                {t('detail.memberTable.headers.team')}
            </SortableTH2>

            <th>{t('detail.memberTable.headers.status')}</th>

            <th>{t('detail.memberTable.headers.email')}</th>

            <th>{t('detail.memberTable.headers.accountPeriod')}</th>

            <th>{t('detail.memberTable.headers.note')}</th>

            <th />
        </tr>
    );
});
TeamMemberInSubscriptionTableHeader.displayName = 'TeamMemberTableHeader';
