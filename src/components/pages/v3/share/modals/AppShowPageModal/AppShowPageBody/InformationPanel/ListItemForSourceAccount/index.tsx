import React, {memo, useEffect} from 'react';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {SourceAccount} from './SourceAccount';
import {useInvoiceAccountsOfSubscription} from '^models/InvoiceAccount/hook';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {ChevronRight} from 'lucide-react';

export const ListItemForSourceAccount = memo(function ListItemForSourceAccount() {
    const {currentSubscription} = useCurrentSubscription();
    const {result, search: loadInvoiceAccount, isLoading} = useInvoiceAccountsOfSubscription();

    useEffect(() => {
        if (!currentSubscription) return;

        loadInvoiceAccount({
            relations: ['subscriptions'],
            where: {
                // @ts-ignore
                subscriptions: {id: currentSubscription.id},
            },
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, [currentSubscription]);

    if (isLoading || result.pagination.totalItemCount === 0) return <></>;

    return (
        <MobileInfoListItem label="청구메일주소">
            <div className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all">
                <SourceAccount />
                <ChevronRight className="text-black" />
            </div>
        </MobileInfoListItem>
    );
});
