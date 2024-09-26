import {memo} from 'react';
import {FaTrashCan} from 'react-icons/fa6';
import {BsStars} from 'react-icons/bs';
import {DeleteInvoiceAccountButton} from './DeleteInvoiceAccountButton';

export const InvoiceAccountActionPanel = memo(function InvoiceAccountActionPanel() {
    return (
        <div className="flex items-center gap-4 justify-end">
            <button className="btn btn-scordi gap-2">
                <BsStars />
                <span>연결</span>
            </button>

            <DeleteInvoiceAccountButton />
        </div>
    );
});
