import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {invoiceAccountApi} from '^api/invoiceAccount.api';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {useCurrentInvoiceAccount} from './atom';
import {useToast} from '^hooks/useToast';

export const RemoveAccountButton = memo(() => {
    const router = useRouter();
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const {toast} = useToast();

    const removeAccount = () => {
        if (!currentInvoiceAccount) return;
        if (!confirm('정말 삭제할까요?')) return;

        const {id, organizationId} = currentInvoiceAccount;
        invoiceAccountApi.destroy(organizationId, id).then(() => {
            toast.success('계정을 삭제했습니다.');
            router.push(V3OrgHomePageRoute.path(organizationId));
        });
    };

    return (
        <button className="btn btn-error btn-outline" onClick={removeAccount}>
            계정 삭제
        </button>
    );
});
