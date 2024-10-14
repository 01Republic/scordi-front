import {memo} from 'react';
import {BsStars} from 'react-icons/bs';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useCurrentInvoiceAccountSync} from '../atom';
import {startSyncWithCheckValidToken} from './ReconnectModal';

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
            <BsStars />
            <span>연결</span>
        </button>
    );
});
