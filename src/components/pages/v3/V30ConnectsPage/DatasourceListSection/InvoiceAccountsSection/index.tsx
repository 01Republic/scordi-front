import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {HiOutlineKey} from 'react-icons/hi2';
import {orgIdParamState} from '^atoms/common';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {useModal} from '^v3/share/modals';
import {ListContainer} from '^v3/V30ConnectsPage/DatasourceListSection/Layouts/ListContainer';
import {newInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {InvoiceAccountItem} from '^v3/V30ConnectsPage/DatasourceListSection/InvoiceAccountsSection/InvoiceAccountItem';

export const InvoiceAccountsSection = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {open} = useModal(newInvoiceAccountModal);
    const {result, search} = useInvoiceAccounts();
    const invoiceAccounts = result.items;

    useEffect(() => {
        search({relations: ['subscriptions'], order: {id: 'DESC'}, itemsPerPage: 0});
    }, [orgId]);

    return (
        <ListContainer
            title="Invoice Account"
            listCount={invoiceAccounts.length}
            Icon={() => <HiOutlineKey size={20} />}
            className="border-r"
            onClickAddButton={() => open()}
        >
            {invoiceAccounts.map((invoiceAccount, i) => (
                <InvoiceAccountItem key={i} invoiceAccount={invoiceAccount} />
            ))}
        </ListContainer>
    );
});
