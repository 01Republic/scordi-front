import React, {memo, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {useModal} from '^v3/share/modals';
import {renewInvoiceAccountModal} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {ListItem} from '^v3/V30ConnectsPage/DatasourceListSection/Layouts/ListItem';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const [isSyncLoading, setIsSyncLoading] = useState<boolean>(false);
    const [isDisConnectLoading, setIsDisConnectLoading] = useState<boolean>(false);
    const {reload: reloadInvoiceAccounts} = useInvoiceAccounts();
    const {open: openRenewModal} = useModal(renewInvoiceAccountModal);
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();
    const {toast} = useToast();

    const {invoiceAccount} = props;

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
        <ListItem className="py-5">
            {/* 이메일 */}
            <div className="flex gap-3 items-center">
                <Avatar src={invoiceAccount.image || undefined} className="w-7 h-7" />
                <p className="text-sm flex gap-2 font-semibold items-center">{invoiceAccount.email}</p>
            </div>

            <span className="text-end">
                <MoreDropdown
                    onSync={onSync}
                    onDelete={onDisConnect}
                    isSyncLoading={isSyncLoading}
                    isDisConnectLoading={isDisConnectLoading}
                />
            </span>
        </ListItem>
    );
});
