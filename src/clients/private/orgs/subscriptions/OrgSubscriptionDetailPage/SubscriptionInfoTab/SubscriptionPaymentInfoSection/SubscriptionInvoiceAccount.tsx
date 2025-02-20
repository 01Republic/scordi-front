import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import Tippy from '@tippyjs/react';
import {useCurrentSubscription} from '../../atom';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {InvoiceAccountProfileCompact, InvoiceAccountSelect} from '^models/InvoiceAccount/components';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '../../EmptyValue';

interface SubscriptionInvoiceAccountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionInvoiceAccount = memo((props: SubscriptionInvoiceAccountProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="청구서메일">
            {isEditMode ? (
                <div className={'mb-[-40px]'}>
                    <InvoiceAccountSelect
                        defaultValue={subscription.invoiceAccounts?.[0]}
                        onSelect={(invoiceAccount) => {
                            form.setValue('invoiceAccountId', invoiceAccount?.id);
                        }}
                        placeholder={<EmptyValue />}
                        getLabel={(option) => <InvoiceAccountProfileCompact invoiceAccount={option} />}
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
                                        외 {subscription.invoiceAccounts?.length - 1}개
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
