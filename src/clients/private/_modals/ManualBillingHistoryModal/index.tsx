import React, {memo} from 'react';
import {X} from 'lucide-react';
import {FormProvider, useForm} from 'react-hook-form';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {ManualPaymentHistoryRegisterForm} from './form-types';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {SubscriptionContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/SubscriptionContent';
import {PaymentContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/PaymentContent';
import {PaidAtContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/PaidAtContent';
import {BillingHistoryStatusContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/BillingHistoryStatusContent';
import {PayCurrencyContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/PayCurrencyContent';
import {PayAmountContent} from '^clients/private/_modals/ManualBillingHistoryModal/billingHistoryContents/PayAmountContent';

interface ManualBillingHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    subscription?: SubscriptionDto;
    creditCard?: CreditCardDto;
    bankAccount?: BankAccountDto;
    billingHistory?: BillingHistoryDto;
}

export const ManualBillingHistoryModal = memo((props: ManualBillingHistoryModalProps) => {
    const {isOpen, onClose} = props;
    const {subscription, creditCard, bankAccount, billingHistory} = props;

    const subscriptionName = subscription?.product?.name();
    const creditCardName = creditCard?.name;
    const bankAccountName = bankAccount?.name;

    const subTitle = subscriptionName || creditCardName || bankAccountName;

    const methods = useForm<ManualPaymentHistoryRegisterForm>({
        mode: 'all',
        defaultValues: {
            subscriptionId: subscription?.id,
            creditCardId: creditCard?.id,
            bankAccountId: bankAccount?.id,
        },
    });
    const {
        handleSubmit,
        reset,
        formState: {isValid},
    } = methods;

    const isLoading = false;

    const onSubmit = (data: ManualPaymentHistoryRegisterForm) => {
        const {creditCardId, bankAccountId, payAmount, payCurrency} = data;
        const {subscriptionId, payDate, billingHistoryStatus} = data;

        const dateKey = billingHistoryStatus === 'PaySuccess' ? 'paidAt' : 'lastRequestedAt';
        const params = {
            creditCardId: creditCardId ? creditCardId : null,
            bankAccountId: bankAccountId ? bankAccountId : null,
            payAmount,
            payCurrency,
            [dateKey]: payDate,
        };
    };

    const onCloseModal = () => {
        reset({
            creditCardId: undefined,
            bankAccountId: undefined,
            payAmount: '',
            payCurrency: undefined,
            payDate: undefined,
            billingHistoryStatus: undefined,
        });
        onClose();
    };

    return (
        <BasicModal open={isOpen} onClose={onCloseModal}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-2xl modal-box keep-all ">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">결제내역 직접 추가</header>
                        <X className="cursor-pointer size-6" onClick={onClose} />
                    </div>
                    <span className="text-gray-700 text-14">
                        "{subscriptionName || creditCardName || bankAccountName}" 결제 내역을 직접 추가할 수 있어요.
                    </span>
                </section>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
                        <div className="grid grid-cols-2 gap-6 gap-x-4 md:gap-x-8">
                            {/* 구독 */}
                            <SubscriptionContent defaultValue={subscription} />

                            {/* 결제수단 */}
                            <PaymentContent defaultValue={creditCard || bankAccount} />

                            {/* 결제 일 */}
                            <PaidAtContent defaultValue={billingHistory} />

                            {/* 결제 상태 */}
                            <BillingHistoryStatusContent defaultValue={billingHistory} />

                            {/* 결제 통화 */}
                            <PayCurrencyContent defaultValue={billingHistory} />

                            {/* 결제 금액 */}
                            <PayAmountContent defaultValue={billingHistory} />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-md text-16 btn-scordi btn-block ${
                                !isValid ? 'btn-disabled2' : 'btn-scordi'
                            } ${isLoading ? 'link_to-loading' : ''}`}
                        >
                            결제내역 추가하기
                        </button>
                    </form>
                </FormProvider>
            </div>
        </BasicModal>
    );
});
