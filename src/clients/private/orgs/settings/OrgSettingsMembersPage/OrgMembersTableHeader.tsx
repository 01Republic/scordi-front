import React, {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {WithChildren} from '^types/global.type';

interface TeamMemberTableHeaderProps extends ListTableHeaderProps {
    pagination: PaginationMetaData;
}

export const OrgMembersTableHeader = memo((props: TeamMemberTableHeaderProps) => {
    const {orderBy, pagination} = props;

    const count = pagination.totalItemCount;

    return (
        <tr className="bg-transparent hover:bg-slate-100/50">
            <TH>{count.toLocaleString()} 명</TH>
            {/*<TH>전화번호</TH>*/}
            <TH>권한</TH>
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
