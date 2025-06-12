import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import Tippy from '@tippyjs/react';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {InvoiceAccountSelectForTableView} from '^models/InvoiceAccount/components/InvoiceAccountSelectForTableView';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '../../EmptyValue';

interface SubscriptionInvoiceAccountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionInvoiceAccount = memo((props: SubscriptionInvoiceAccountProps) => {
    const {isEditMode, form, subscription} = props;

    return (
        <FormControl label="청구서메일">
            {isEditMode ? (
                <div className="flex items-center input border-gray-200 bg-gray-100 ">
                    <InvoiceAccountSelectForTableView
                        defaultValue={subscription.invoiceAccounts}
                        onChange={(invoiceAccounts) => {
                            const newInvoiceAccounts = invoiceAccounts || [];
                            form.setValue(
                                'invoiceAccountIdsForMulti',
                                newInvoiceAccounts.map((invoiceAccount) => invoiceAccount.id),
                            );
                        }}
                        ValueComponent={(props) => {
                            const {value} = props;
                            return typeof value === 'string' ? (
                                <p>{value}</p>
                            ) : (
                                <InvoiceAccountProfileCompact invoiceAccount={value} />
                            );
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    {!!subscription.invoiceAccounts?.length ? (
                        <>
                            <InvoiceAccountProfileCompact invoiceAccount={(subscription.invoiceAccounts || [])[0]} />
                            {!!(subscription.invoiceAccounts?.length - 1) && (
                                <Tippy
                                    content={
                                        <span
                                            className="text-12"
                                            dangerouslySetInnerHTML={{
                                                __html: subscription.invoiceAccounts
                                                    .map((item) => item.email)
                                                    .join('<br />'),
                                            }}
                                        />
                                    }
                                >
                                    <div className="text-gray-500 text-13 cursor-pointer">
                                        &nbsp; 외 {subscription.invoiceAccounts?.length - 1}개
                                    </div>
                                </Tippy>
                            )}
                        </>
                    ) : (
                        <EmptyValue />
                    )}
                </div>
            )}
            <span />
        </FormControl>
    );
});
