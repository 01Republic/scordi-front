import {memo} from 'react';
import {useCurrentInvoiceAccount} from '../atom';
import {InvoiceAccountSyncCreateButton} from './InvoiceAccountSyncCreateButton';
import {InvoiceAccountSyncUpdateButton} from './InvoiceAccountSyncUpdateButton';
import {DeleteInvoiceAccountButton} from './DeleteInvoiceAccountButton';

export const InvoiceAccountActionPanel = memo(function InvoiceAccountActionPanel() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const isManuallyCreated = currentInvoiceAccount?.isManuallyCreated;

    return (
        <div className="flex items-center gap-4 justify-end">
            {isManuallyCreated ? <InvoiceAccountSyncCreateButton /> : <InvoiceAccountSyncUpdateButton />}

            <DeleteInvoiceAccountButton />
        </div>
    );
});
