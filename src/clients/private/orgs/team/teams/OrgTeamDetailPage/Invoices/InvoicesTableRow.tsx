import React, {memo} from 'react';
import {MinusCircle} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamInvoiceAccountDto} from '^models/TeamInvoiceAccount/type';
import {useDestroyTeamInvoiceAccount} from '^models/TeamInvoiceAccount/hook/hook';
import {useUpdateTeamInvoiceAccount} from '^models/InvoiceAccount/hook';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {confirm2} from '^components/util/dialog';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';

interface InvoicesTableRowProps {
    teamInvoiceAccount: TeamInvoiceAccountDto;
    onClick?: (invoice: TeamInvoiceAccountDto) => any;
    reload?: () => any;
}

export const InvoicesTableRow = memo((props: InvoicesTableRowProps) => {
    const {teamInvoiceAccount, onClick, reload} = props;
    const orgId = useOrgIdParam();

    const {invoiceAccountId, invoiceAccount} = teamInvoiceAccount;
    const {mutateAsync: updateTeamInvoiceAccount} = useUpdateTeamInvoiceAccount(orgId);
    const {mutateAsync: destroyTeamInvoiceAccount} = useDestroyTeamInvoiceAccount(orgId);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const update = async (dto: UpdateInvoiceAccountDto) => {
        return updateTeamInvoiceAccount({id: invoiceAccountId, data: dto})
            .then(() => toast.success('수정했습니다'))
            .catch((e) => toast.error(e.response.data.message));
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
                destroyTeamInvoiceAccount(teamInvoiceAccount.id).then(() => {
                    toast.success('연결을 해제했어요.');
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

            {/*구독 수*/}
            <td className={`${hoverBgColor}`}>
                <div>
                    <p className="text-14">
                        {invoiceAccount.subscriptions?.length.toLocaleString()}{' '}
                        <small className="font-light">apps</small>
                    </p>
                </div>
            </td>

            {/* 비고 */}
            <td className={`${hoverBgColor}`}>
                <AirInputText
                    defaultValue={invoiceAccount.memo || undefined}
                    onChange={async (memo) => {
                        if (invoiceAccount.memo === memo) return;
                        return update({memo});
                    }}
                />
            </td>

            {/*<td className={`${hoverBgColor}`}>*/}
            {/*    <TeamMemberSelectColumn*/}
            {/*        defaultValue={invoiceAccount.holdingMember}*/}
            {/*        onChange={(holdingMember) => {*/}
            {/*            if (invoiceAccount?.holdingMemberId === holdingMember?.id) return;*/}
            {/*            return update({holdingMemberId: holdingMember?.id || null});*/}
            {/*        }}*/}
            {/*        compactView*/}
            {/*    />*/}
            {/*</td>*/}

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="팀에서 제외">
                        <div>
                            <MinusCircle
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
