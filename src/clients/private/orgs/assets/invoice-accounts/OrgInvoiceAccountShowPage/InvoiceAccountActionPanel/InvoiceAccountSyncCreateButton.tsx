import {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useCurrentInvoiceAccountSync} from '../atom';
import {startSyncWithCheckValidToken} from './ReconnectModal';
import {Sparkles} from 'lucide-react';

interface InvoiceAccountSyncCreateButtonProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountSyncCreateButton = memo((props: InvoiceAccountSyncCreateButtonProps) => {
    const {invoiceAccount} = props;
    const {startSync, isSyncRunning} = useCurrentInvoiceAccountSync();

    const onClick = () => {
        startSyncWithCheckValidToken(invoiceAccount, () => startSync());
    };

    return (
        <button className={`btn btn-scordi gap-2 ${isSyncRunning ? 'link_to-loading' : ''}`} onClick={onClick}>
            <Sparkles />
            <span>연결</span>
        </button>
    );
});
