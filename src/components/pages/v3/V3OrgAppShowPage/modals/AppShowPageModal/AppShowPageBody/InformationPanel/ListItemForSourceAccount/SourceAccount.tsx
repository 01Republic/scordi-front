import React, {memo, useEffect, useState} from 'react';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';
import {V3OrgInvoiceAccountShowPageRoute} from '^pages/v3/orgs/[orgId]/invoiceAccounts/[invoiceAccountId]';
import {useRouter} from 'next/router';

export const SourceAccount = memo(function SourceAccount() {
    const router = useRouter();
    const {currentSubscription} = useCurrentSubscription();
    const [invoiceAccount, setInvoiceAccount] = useState<InvoiceAccountDto>();

    useEffect(() => {
        if (!currentSubscription) return;
        if (!currentSubscription.invoiceAccountId) return; // invoiceAccountId is nullable

        invoiceAccountApi.show(currentSubscription.organizationId, currentSubscription.invoiceAccountId).then((res) => {
            setInvoiceAccount(res.data);
        });
    }, [currentSubscription]);

    if (!currentSubscription?.invoiceAccountId) return <></>; // rendering ignore.
    if (!invoiceAccount) return <div>loading...</div>;

    return (
        <div
            className="flex items-center no-selectable gap-2"
            onClick={() => {
                router.push(V3OrgInvoiceAccountShowPageRoute.path(invoiceAccount.organizationId, invoiceAccount.id));
            }}
        >
            <Avatar src={invoiceAccount.image || ''} className="w-5 h-5 outline outline-offset-1 outline-slate-100" />
            <p className="text-[16px]">
                <span>{invoiceAccount.email}</span>
                {/*&nbsp;<span>에서 연결중</span>*/}
            </p>
        </div>
    );
});
