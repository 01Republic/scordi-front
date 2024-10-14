import {memo} from 'react';
import {useCurrentInvoiceAccount} from '../atom';
import {InvoiceAccountSyncCreateButton} from './InvoiceAccountSyncCreateButton';
import {InvoiceAccountSyncUpdateButton} from './InvoiceAccountSyncUpdateButton';
import {DeleteInvoiceAccountButton} from './DeleteInvoiceAccountButton';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {googleOAuth} from '^config/environments';
import {GoogleOAuthProvider} from '@react-oauth/google';

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

            <DeleteInvoiceAccountButton />
        </div>
    );
});
