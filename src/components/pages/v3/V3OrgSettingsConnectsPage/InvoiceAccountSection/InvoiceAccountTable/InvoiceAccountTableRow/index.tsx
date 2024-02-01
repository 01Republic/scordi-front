import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {useToast} from '^hooks/useToast';
import {useAlert} from '^hooks/useAlert';
import {Avatar} from '^components/Avatar';
import {useModal} from '^v3/share/modals';
import {renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto | undefined;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const [isSyncLoading, setIsSyncLoading] = useState<boolean>(false);
    const [isDisConnectLoading, setIsDisConnectLoading] = useState<boolean>(false);
    const {reload: reloadInvoiceAccounts} = useInvoiceAccounts();
    const {open: openRenewModal} = useModal(renewInvoiceAccountModal);
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();
    const {toast} = useToast();

    const {invoiceAccount} = props;
    if (!invoiceAccount) return <></>;

    const onDisConnect = () => {
        if (isDisConnectLoading) return;

        const invoiceAccountId = invoiceAccount?.id;
        if (!orgId || isNaN(orgId) || !invoiceAccountId || isNaN(invoiceAccountId)) return;

        const req = alert.destroy({
            title: '연동을 해제하시겠습니까?',
            onConfirm: () => invoiceAccountApi.destroy(orgId, invoiceAccountId),
        });

        setIsDisConnectLoading(true);
        req.then((res) => {
            if (!res) return;

            reloadInvoiceAccounts();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setIsDisConnectLoading(false));
    };

    const onSync = () => {
        if (isSyncLoading) return;

        setIsSyncLoading(true);
        invoiceAccountApi
            .sync(invoiceAccount.organizationId, invoiceAccount.id)
            .then(() => {
                toast.success('동기화가 완료됐습니다.');
                reloadInvoiceAccounts();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                openRenewModal();
            })
            .finally(() => setIsSyncLoading(false));
    };

    return (
        <tr className={`${(isSyncLoading || isDisConnectLoading) && 'btn-disabled animate-pulse'} `}>
            {/* 이메일 */}
            <td>
                <div className="flex gap-3 items-center">
                    <Avatar src={invoiceAccount.image || undefined} className="w-7 h-7" />

                    <p className="text-sm flex gap-2 font-semibold items-center">
                        <span>{invoiceAccount.email}</span>
                    </p>
                </div>
            </td>

            <td className="text-end">
                <MoreDropdown
                    onSync={onSync}
                    onDelete={onDisConnect}
                    isSyncLoading={isSyncLoading}
                    isDisConnectLoading={isDisConnectLoading}
                />
            </td>
        </tr>
    );
});
