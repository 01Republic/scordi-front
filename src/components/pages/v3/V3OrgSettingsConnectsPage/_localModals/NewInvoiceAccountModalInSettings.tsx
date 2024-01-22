import {memo} from 'react';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {NewInvoiceAccountModal} from 'src/components/pages/v3/share/modals/NewInvoiceAccountModal';

export const NewInvoiceAccountModalInSettings = memo(() => {
    const {reload} = useInvoiceAccounts();

    return <NewInvoiceAccountModal onClose={() => reload()} />;
});
