import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {BankAccountSelect} from '^models/BankAccount/components/BankAccountSelect';
import {useQuery} from '@tanstack/react-query';
import {bankAccountApi} from '^models/BankAccount/api';

interface SubscriptionBankAccountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionBankAccount = memo((props: SubscriptionBankAccountProps) => {
    const {isEditMode, form, subscription} = props;
    const {id, organizationId: orgId, bankAccountId} = subscription;
    const bankAccountQuery = useQuery({
        queryKey: ['subscription.bankAccount', id, bankAccountId],
        queryFn: async () => {
            return bankAccountApi.show(orgId, bankAccountId!).then((res) => res.data);
        },
        enabled: !!bankAccountId,
    });

    const defaultBankAccount = bankAccountQuery.data || subscription.bankAccount;

    return (
        <FormControl label="연결된 계좌">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <BankAccountSelect
                        defaultValue={defaultBankAccount}
                        onChange={(bankAccount) => {
                            form.setValue('bankAccountId', bankAccount?.id || null);
                        }}
                        ValueComponent={(props) => {
                            const {value} = props;
                            return typeof value === 'string' ? (
                                <p>{value}</p>
                            ) : (
                                <BankAccountProfileCompact item={value} />
                            );
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">
                    <BankAccountProfileCompact item={defaultBankAccount} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
