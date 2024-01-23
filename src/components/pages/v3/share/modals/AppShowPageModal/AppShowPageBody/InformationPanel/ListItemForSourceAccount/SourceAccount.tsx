import React, {memo, useEffect, useState} from 'react';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {Avatar} from '^components/Avatar';
import {LinkTo} from '^components/util/LinkTo';
import {useInvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal/hook';
import {useInvoiceAccountsOfSubscription} from '^models/InvoiceAccount/hook';

export const SourceAccount = memo(function SourceAccount() {
    const {show: openModal} = useInvoiceAccountSelectModal();
    const {currentSubscription} = useCurrentSubscription();
    const {result} = useInvoiceAccountsOfSubscription();
    const invoiceAccounts = result.items;

    // 이 컴포넌트는 반드시 invoiceAccounts 의 요소가 반드시 1개 이상 존재한다는 것을 확인한 후 랜더링 됩니다.
    const invoiceAccount = invoiceAccounts[0];
    const length = invoiceAccounts.length;

    const openInvoiceAccountListModal = () => {
        if (!currentSubscription) return;
        openModal(currentSubscription.id);
    };

    return (
        <LinkTo
            // href={safePath((org) => V3OrgInvoiceAccountShowPageRoute.path(org.id, invoiceAccount.id))}
            className="flex items-center no-selectable gap-2"
            onClick={() => openInvoiceAccountListModal()}
        >
            <Avatar src={invoiceAccount.image || ''} className="w-5 h-5 outline outline-offset-1 outline-slate-100" />
            <p className="text-[16px]">
                <span>{invoiceAccount.email}</span>
                {length > 1 && <span className="ml-2">등 {length}개</span>}
            </p>
        </LinkTo>
    );
});
