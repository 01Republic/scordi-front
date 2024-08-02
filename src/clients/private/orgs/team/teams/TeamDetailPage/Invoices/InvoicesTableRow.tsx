import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {TeamSelect} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamSelect';
import {TeamMemberStatusDropdown} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {TeamMemberRole} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberRole';
import {InvoiceAccountDto, UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {Avatar} from '^components/Avatar';
import {FaTrash} from '@react-icons/all-files/fa/FaTrash';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {creditCardApi} from '^models/CreditCard/api';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {confirm2} from '^components/util/dialog';
import {teamMembershipApi} from '^models/TeamMembership/api';

interface InvoicesTableRowProps {
    item: TeamInvoiceAccountDto;
    onClick?: (invoice: TeamInvoiceAccountDto) => any;
    reload?: () => any;
}

export const InvoicesTableRow = memo((props: InvoicesTableRowProps) => {
    const {item, onClick, reload} = props;
    const orgId = useRecoilValue(orgIdParamState);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const update = async (dto: UpdateInvoiceAccountDto) => {
        return invoiceAccountApi
            .updateV3(orgId, item.id, dto)
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.error('문제가 발생했습니다'))
            .finally(() => reload && reload());
    };

    const onDelete = () => {
        confirm2(`청구서 수신 계정 연결 해제`, `${item.invoiceAccount?.email} 연결을 해제 할까요?`, 'warning').then(
            (res) => {
                if (res.isConfirmed) {
                    teamInvoiceAccountApi.destroy(orgId, item.id).then(() => {
                        toast.success('삭제했습니다');
                        reload && reload();
                    });
                }
            },
        );
    };

    const showPagePath = OrgInvoiceAccountShowPageRoute.path(orgId, item.id);

    if (!item.invoiceAccount) return <tr className="group"></tr>;

    return (
        <tr className="group">
            {/*프로필*/}
            <td
                className={`cursor-pointer ${hoverBgColor} flex items-center gap-3`}
                onClick={() => onClick && onClick(item)}
            >
                <OpenButtonColumn href={showPagePath}>
                    <InvoiceAccountProfile invoiceAccount={item.invoiceAccount} />
                </OpenButtonColumn>
            </td>

            <td className={`${hoverBgColor}`}>
                <TeamMemberSelectColumn
                    defaultValue={item.invoiceAccount.holdingMember}
                    onChange={async (holdingMember) => {
                        if (item.invoiceAccount?.holdingMemberId === holdingMember?.id) return;
                        return update({holdingMemberId: holdingMember?.id || null});
                    }}
                    compactView
                />
            </td>

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="이 팀에서 제거">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                                onClick={onDelete}
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
InvoicesTableRow.displayName = 'InvoicesTableRow';
