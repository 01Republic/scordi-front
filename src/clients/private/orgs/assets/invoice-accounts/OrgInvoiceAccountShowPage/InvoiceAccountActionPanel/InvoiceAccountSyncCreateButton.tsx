import {memo} from 'react';
import {BsStars} from 'react-icons/bs';

export const InvoiceAccountSyncCreateButton = memo(function InvoiceAccountCreateSyncButton() {
    return (
        <button className="btn btn-scordi gap-2">
            <BsStars />
            <span>연결</span>
        </button>
    );
});
