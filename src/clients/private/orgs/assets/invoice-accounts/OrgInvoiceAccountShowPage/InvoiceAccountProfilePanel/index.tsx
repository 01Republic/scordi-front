import React, {memo} from 'react';
import {useCurrentInvoiceAccount} from '../atom';
import {Avatar} from '^components/Avatar';
import {KeyValue} from '^clients/private/_components/rest-pages/ShowPage/KeyValue';
import {InvoiceAccountProviderAvatar} from '^models/InvoiceAccount/components';
import {InvoiceAccountTeamList} from './InvoiceAccountTeamList';

export const InvoiceAccountProfilePanel = memo(function InvoiceAccountProfilePanel() {
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();

    if (!currentInvoiceAccount) return <></>;

    return (
        <div>
            <div className="flex gap-8">
                <div>
                    <Avatar
                        src={currentInvoiceAccount.image || ''}
                        className={`w-14 outline outline-offset-2 outline-2 ${
                            currentInvoiceAccount.isManuallyCreated ? 'outline-slate-200' : 'outline-blue-400'
                        }`}
                    />
                </div>

                <div>
                    {currentInvoiceAccount.isManuallyCreated ? (
                        <h1 className="text-18 font-semibold my-2">{currentInvoiceAccount.email}</h1>
                    ) : (
                        <div className="">
                            <h1 className="text-18 font-semibold">{currentInvoiceAccount.googleTokenData?.name}</h1>
                            <div className="flex items-center gap-2">
                                <p className="text-14">{currentInvoiceAccount.googleTokenData?.email}</p>
                                <InvoiceAccountProviderAvatar invoiceAccount={currentInvoiceAccount} />
                            </div>
                        </div>
                    )}

                    {/*<div className="mt-2 mb-4">*/}
                    {/*    <KeyValue label="팀" value={<InvoiceAccountTeamList />} />*/}
                    {/*    <KeyValue*/}
                    {/*        label="구독"*/}
                    {/*        value={*/}
                    {/*            <p className="text-14">*/}
                    {/*                <span>{currentInvoiceAccount.subscriptions?.length.toLocaleString()}</span>*/}
                    {/*                <small className="text-gray-400 ml-1">apps</small>*/}
                    {/*            </p>*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
});
