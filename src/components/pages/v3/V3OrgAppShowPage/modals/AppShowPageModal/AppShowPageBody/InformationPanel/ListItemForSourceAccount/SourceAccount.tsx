import React, {memo, useEffect, useState} from 'react';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {Avatar} from '^components/Avatar';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';
import {useInvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal/hook';
import {useInvoiceAccountsV3} from '^models/InvoiceAccount/hook';
import {
    getInvoiceAccountsQueryAtom,
    invoiceAccountsSearchResultAtom,
} from '^v3/share/modals/InvoiceAccountSelectModal/atom';
import {useRecoilValue} from 'recoil';

export const SourceAccount = memo(function SourceAccount() {
    const router = useRouter();
    const {show: openModal} = useInvoiceAccountSelectModal();
    const {currentSubscription} = useCurrentSubscription();
    const {search: loadInvoiceAccount} = useInvoiceAccountsV3(
        invoiceAccountsSearchResultAtom,
        getInvoiceAccountsQueryAtom,
    );
    const result = useRecoilValue(invoiceAccountsSearchResultAtom);
    const [isLoading, setIsLoading] = useState(false);
    const invoiceAccounts = result.items;

    useEffect(() => {
        if (!currentSubscription) return;

        setIsLoading(true);

        loadInvoiceAccount({
            relations: ['subscriptions'],
            where: {
                // @ts-ignore
                subscriptions: {id: currentSubscription.id},
            },
            order: {id: 'DESC'},
            itemsPerPage: 0,
        }).finally(() => {
            setIsLoading(false);
        });
    }, [currentSubscription]);

    if (!invoiceAccounts) return <></>; // rendering ignore.
    if (isLoading) return <div>loading...</div>;
    const invoiceAccount = invoiceAccounts[0];
    if (!invoiceAccount) return <></>;

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
