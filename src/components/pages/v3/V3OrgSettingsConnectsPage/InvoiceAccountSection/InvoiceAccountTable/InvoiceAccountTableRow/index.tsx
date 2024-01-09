import React, {memo, useRef, useState} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {BsDashCircle} from 'react-icons/bs';
import {FiRefreshCw} from 'react-icons/fi';
import {MoreDropdown} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown';
import {DropdownContent} from '^v3/share/table/columns/SelectColumn/DropdownContent';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {FaRegTrashAlt} from 'react-icons/fa';
import {GmailAgentProgress, gmailAgentProgressAtom} from '^hooks/useGoogleAccessToken';
import {useToast} from '^hooks/useToast';
import {useModal} from '^v3/share/modals';
import {renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto | undefined;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const {search: getInvoiceAccounts} = useInvoiceAccounts();
    const setGmailAgentProgress = useSetRecoilState(gmailAgentProgressAtom);
    const {open: openRenewModal} = useModal(renewInvoiceAccountModal);
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();
    const {toast} = useToast();

    const {invoiceAccount} = props;
    if (!invoiceAccount) return <></>;

    const onDelete = () => {
        const invoiceAccountId = invoiceAccount?.id;

        if (!orgId || isNaN(orgId) || !invoiceAccountId || isNaN(invoiceAccountId)) return;
        const res = alert.destroy({
            title: '인보이스 수신 계정을 삭제하시겠습니까?',
            onConfirm: () => invoiceAccountApi.destroy(orgId, invoiceAccountId),
        });

        res.then(() => {
            getInvoiceAccounts({itemsPerPage: 10});
        });
    };

    const onSync = () => {
        setGmailAgentProgress(GmailAgentProgress.started);
        invoiceAccountApi
            .sync(invoiceAccount.organizationId, invoiceAccount.id)
            .then((res) => {
                setGmailAgentProgress(GmailAgentProgress.no_running);
                window.location.reload();
            })
            .catch((err) => {
                toast.error('구글 로그인이 만료되었습니다.');
                openRenewModal();
            });
    };

    return (
        <tr>
            {/* 이메일 */}
            <td>
                <div className="flex gap-3 items-center">
                    <Avatar src={invoiceAccount.image || undefined} className="w-7 h-7" />

                    <p className="text-sm flex gap-2 font-semibold items-center">
                        <span>{invoiceAccount.email}</span>
                    </p>
                </div>
            </td>

            <td className="flex gap-3 justify-end">
                <MoreDropdown isCurrent={false} option={0} destroyRequest={onDelete} className="!block">
                    <MoreDropdownListItem onClick={() => onSync()}>
                        <div className="flex items-center gap-3 w-full">
                            <FiRefreshCw />
                            <p>동기화</p>
                        </div>
                    </MoreDropdownListItem>
                </MoreDropdown>
            </td>
        </tr>
    );
});
