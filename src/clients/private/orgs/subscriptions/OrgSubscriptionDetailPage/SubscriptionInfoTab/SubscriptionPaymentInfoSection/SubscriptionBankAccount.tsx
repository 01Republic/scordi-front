import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {BankAccountProfileCompact} from '^models/BankAccount/components';
import {BankAccountSelect} from '^models/BankAccount/components/BankAccountSelect';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useBankAccountOfSubscription} from '../../hooks';

interface SubscriptionBankAccountProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    subscription: SubscriptionDto;
}

export const SubscriptionBankAccount = memo((props: SubscriptionBankAccountProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, subscription} = props;
    const bankAccountQuery = useBankAccountOfSubscription(subscription);

    const defaultBankAccount = bankAccountQuery.data || subscription.bankAccount;

    return (
        <FormControl label={t('detail.paymentInfo.bankAccount')}>
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
