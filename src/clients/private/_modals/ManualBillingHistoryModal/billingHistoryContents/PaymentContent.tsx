import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {useCreditCards2} from '^models/CreditCard/hook';
import {useBankAccounts2} from '^models/BankAccount/hook';
import {ManualPaymentHistoryRegisterForm} from '../form-types';
import {useOrgIdParam} from '^atoms/common';
import {ContentBox} from './ContentBox';
import {PaymentSelect} from '^_components/dropdown-select/PaymentSelect';

interface PaymentContentProps {
    defaultValue?: CreditCardDto | BankAccountDto | null;
    onClick?: (value: CreditCardDto | BankAccountDto) => void;
    readonly?: '결제수단' | '구독';
}

export const PaymentContent = memo((props: PaymentContentProps) => {
    const {defaultValue, readonly} = props;
    const orgId = useOrgIdParam();
    const {setValue, register} = useFormContext<ManualPaymentHistoryRegisterForm>();
    const {
        result: creditCardResult,
        reload: creditCardReload,
        isLoading: isCreditCardLoading,
    } = useCreditCards2(orgId, {
        where: {organizationId: orgId},
        itemsPerPage: 0,
    });
    const {
        result: bankAccountResult,
        reload: bankAccountReload,
        isLoading: isBankAccountLoading,
    } = useBankAccounts2(orgId, {
        where: {organizationId: orgId},
        itemsPerPage: 0,
    });

    const noChange = readonly === '결제수단';

    const handleSelect = (item: CreditCardDto | BankAccountDto) => {
        if (item instanceof CreditCardDto) {
            setValue('creditCardId', item.id, {shouldValidate: true, shouldDirty: true});
            setValue('bankAccountId', undefined, {shouldValidate: true, shouldDirty: true});
        } else {
            setValue('bankAccountId', item.id, {shouldValidate: true, shouldDirty: true});
            setValue('creditCardId', undefined, {shouldValidate: true, shouldDirty: true});
        }
    };

    return (
        <ContentBox label="결제수단" required>
            <input type="hidden" {...register('creditCardId')} />
            <input type="hidden" {...register('bankAccountId')} />
            <PaymentSelect
                defaultValue={defaultValue || undefined}
                isLoading={isCreditCardLoading || isBankAccountLoading}
                creditCards={creditCardResult.items}
                bankAccounts={bankAccountResult.items}
                onSelect={handleSelect}
                onOpen={() => {
                    bankAccountReload();
                    creditCardReload();
                }}
                readonly={noChange}
            />
        </ContentBox>
    );
});
