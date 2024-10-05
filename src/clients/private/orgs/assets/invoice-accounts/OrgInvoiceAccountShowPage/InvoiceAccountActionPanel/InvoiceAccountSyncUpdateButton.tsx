import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {useCurrentInvoiceAccount} from '^clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/atom';
import {IoMdRefresh} from '^components/react-icons';
import {PiLightningFill} from 'react-icons/pi';

export const InvoiceAccountSyncUpdateButton = memo(function InvoiceAccountSyncUpdateButton() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    if (!currentInvoiceAccount) return <></>;

    const onClick = () => {
        if (!currentInvoiceAccount) return;
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-success border border-success text-14 px-2.5 py-1 rounded-full">
                <PiLightningFill fontSize={12} />
                <div className="font-semibold text-left">Connected</div>
            </div>

            <Tippy content="Sync now">
                <div className="btn btn-square border-gray-300" onClick={onClick}>
                    <IoMdRefresh fontSize={20} />
                </div>
            </Tippy>
        </div>
    );
});
