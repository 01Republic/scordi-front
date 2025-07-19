import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {WithChildren} from '^types/global.type';
import {useTranslation} from 'next-i18next';

interface TeamMemberTableHeaderProps extends ListTableHeaderProps {
    pagination: PaginationMetaData;
}

export const OrgMembersTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {orderBy, pagination} = props;
    const {t} = useTranslation('workspaceSettings');
    const count = pagination.totalItemCount;

    return (
        <tr className="bg-transparent hover:bg-slate-100/50">
            <TH>{t('memberManagement.table.count', {count: count.toLocaleString() as never})}</TH>
            {/*<TH>전화번호</TH>*/}
            <TH>{t('memberManagement.table.role') as unknown as string}</TH>
            <TH />
        </tr>
    );
});
OrgMembersTableHeader.displayName = 'TeamMembersTableHeader';

interface THProps extends WithChildren {
    className?: string;
}

const TH = memo((props: THProps) => {
    const {className = '', children} = props;

    return (
        <th
            className={`h-10 px-2 py-0 text-left align-middle font-medium text-gray-500 text-14 rounded-tl-none rounded-tr-none ${className}`}
        >
            {children}
        </th>
    );
});
