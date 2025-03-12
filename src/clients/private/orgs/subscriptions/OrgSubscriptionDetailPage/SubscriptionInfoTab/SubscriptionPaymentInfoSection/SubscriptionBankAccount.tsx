import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useCurrentSubscription} from '../../atom';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {BankAccountSelect} from '^models/BankAccount/components/BankAccountSelect';

interface SubscriptionBankAccountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

export const SubscriptionBankAccount = memo((props: SubscriptionBankAccountProps) => {
    const {isEditMode, form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return <></>;

    return (
        <FormControl label="연결된 계좌">
            {isEditMode ? (
                <div className={'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'}>
                    <BankAccountSelect
                        defaultValue={subscription.bankAccount}
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
                    <BankAccountProfileCompact item={subscription.bankAccount} />
                </div>
            )}
            <span />
        </FormControl>
    );
});
