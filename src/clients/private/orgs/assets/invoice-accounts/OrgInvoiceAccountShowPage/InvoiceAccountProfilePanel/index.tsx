import React, {memo} from 'react';
import {useCurrentInvoiceAccount} from '../atom';
import {Avatar} from '^components/Avatar';
import {KeyValue} from '^clients/private/_components/rest-pages/ShowPage/KeyValue';

export const InvoiceAccountProfilePanel = memo(function InvoiceAccountProfilePanel() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    if (!currentInvoiceAccount) return <></>;

    return (
        <div>
            <div className="flex gap-8">
                <div>
                    <Avatar className="w-14"></Avatar>
                </div>

                <div>
                    <h1 className="text-2xl font-semibold my-2">{currentInvoiceAccount.email}</h1>

                    <div className="mt-2 mb-4">
                        <KeyValue label="" value="" />
                    </div>
                </div>
            </div>
        </div>
    );
});
