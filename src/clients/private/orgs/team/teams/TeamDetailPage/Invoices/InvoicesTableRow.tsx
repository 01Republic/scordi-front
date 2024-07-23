import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {TeamMemberRole} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberRole';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {Avatar} from '^components/Avatar';
import {FaTrash} from '@react-icons/all-files/fa/FaTrash';

interface InvoicesTableRowProps {
    item: TeamInvoiceAccountDto;
    onClick?: (invoice: TeamInvoiceAccountDto) => any;
    reload?: () => any;
}

export const InvoicesTableRow = memo((props: InvoicesTableRowProps) => {
    const {item, onClick, reload} = props;

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    return (
        <tr className="group">
            {/*프로필*/}
            <td
                className={`cursor-pointer ${hoverBgColor} flex items-center space-x-1`}
                onClick={() => onClick && onClick(item)}
            >
                <Avatar
                    src={item.invoiceAccount?.image || ''}
                    className="w-8 h-8 outline outline-offset-1 outline-slate-100"
                />
                <p className="block text-14 font-normal truncate">{item.invoiceAccount?.email}</p>
            </td>

            <td className={`${hoverBgColor}`}></td>

            <td className={`${hoverBgColor}`}></td>

            <td className={`${hoverBgColor}`}>
                <button onClick={() => console.log('delete')}>
                    <FaTrash className="cursor-pointer" />
                </button>
            </td>
        </tr>
    );
});
InvoicesTableRow.displayName = 'InvoicesTableRow';
