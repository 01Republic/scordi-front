import React, {memo} from 'react';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {confirm2} from '^components/util/dialog';

interface InvoicesTableRowProps {
    teamInvoiceAccount: TeamInvoiceAccountDto;
    onClick?: (invoice: TeamInvoiceAccountDto) => any;
    reload?: () => any;
}

export const InvoicesTableRow = memo((props: InvoicesTableRowProps) => {
    const {teamInvoiceAccount, onClick, reload} = props;
    const orgId = useRecoilValue(orgIdParamState);

    const {invoiceAccountId, invoiceAccount} = teamInvoiceAccount;
    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const update = async (dto: UpdateInvoiceAccountDto) => {
        return invoiceAccountApi
            .updateV3(orgId, invoiceAccountId, dto)
            .then(() => toast.success('수정했습니다'))
            .catch((e) => toast.error(e.response.data.message))
            .finally(() => reload && reload());
    };

    const onDelete = () => {
        confirm2(
            `청구서 메일 연결을 해제할까요?`,
            <span>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>팀에서 제외</b>됩니다. <br />
                그래도 연결을 해제 하시겠어요?
            </span>,
            'warning',
        ).then((res) => {
            if (res.isConfirmed) {
                teamInvoiceAccountApi.destroy(orgId, teamInvoiceAccount.id).then(() => {
                    toast.success('삭제했습니다');
                    reload && reload();
                });
            }
        });
    };

    const showPagePath = OrgInvoiceAccountShowPageRoute.path(orgId, invoiceAccountId);

    if (!invoiceAccount) return <tr className="group"></tr>;

    return (
        <tr className="group">
            {/*프로필*/}
            <td
                className={`cursor-pointer ${hoverBgColor} flex items-center gap-3`}
                onClick={() => onClick && onClick(teamInvoiceAccount)}
            >
                <OpenButtonColumn href={showPagePath}>
                    <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                </OpenButtonColumn>
            </td>

            <td className={`${hoverBgColor}`}>
                <TeamMemberSelectColumn
                    defaultValue={invoiceAccount.holdingMember}
                    onChange={(holdingMember) => {
                        if (invoiceAccount?.holdingMemberId === holdingMember?.id) return;
                        return update({holdingMemberId: holdingMember?.id || null});
                    }}
                    compactView
                />
            </td>

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="팀에서 제외">
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
