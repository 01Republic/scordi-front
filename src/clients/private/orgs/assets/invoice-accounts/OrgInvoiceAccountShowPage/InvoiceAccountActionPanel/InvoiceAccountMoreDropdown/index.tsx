import {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {ChangeUsingStatusItem} from './ChangeUsingStatusItem';
import {DeleteInvoiceAccountItem} from './DeleteInvoiceAccountItem';

export const InvoiceAccountMoreDropdown = memo(function () {
    return (
        <MoreDropdown>
            <ChangeUsingStatusItem />
            <DeleteInvoiceAccountItem />
        </MoreDropdown>
    );
});
