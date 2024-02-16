import {memo} from 'react';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {NewInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal';

export const NewInvoiceAccountModalInConnects = memo(() => {
    const {reload} = useInvoiceAccounts();

    return <NewInvoiceAccountModal onFinish={() => reload()} />;
});
