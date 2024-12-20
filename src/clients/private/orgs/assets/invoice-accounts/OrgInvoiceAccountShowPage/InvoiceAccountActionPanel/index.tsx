import {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountSyncCreateButton} from './InvoiceAccountSyncCreateButton';
import {InvoiceAccountSyncUpdateButton} from './InvoiceAccountSyncUpdateButton';
import {InvoiceAccountMoreDropdown} from './InvoiceAccountMoreDropdown';

interface Props {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountActionPanel = memo((props: Props) => {
    const {invoiceAccount} = props;

    return (
        <div className="flex items-center gap-4 justify-end">
            {invoiceAccount.isManuallyCreated ? (
                <InvoiceAccountSyncCreateButton invoiceAccount={invoiceAccount} />
            ) : (
                <InvoiceAccountSyncUpdateButton invoiceAccount={invoiceAccount} />
            )}

            <InvoiceAccountMoreDropdown />
        </div>
    );
});
