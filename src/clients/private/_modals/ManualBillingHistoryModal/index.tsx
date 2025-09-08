import React, {memo, useEffect} from 'react';
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
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {UpdateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/UpdateBillingHistoryByManual.request.dto';
import {errorToast} from '^api/api';

interface ManualBillingHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: (dto: UpdateBillingHistoryByManualRequestDto) => Promise<void>;
    onCreate?: (dto: CreateBillingHistoryByManualRequestDto) => Promise<void>;
    isLoading: boolean;
    readonly?: '결제수단' | '구독';
    subscription?: SubscriptionDto;
    creditCard?: CreditCardDto;
    bankAccount?: BankAccountDto;
    billingHistory?: BillingHistoryDto;
}

export const ManualBillingHistoryModal = memo((props: ManualBillingHistoryModalProps) => {
    const {onUpdate, onCreate, onClose} = props;
    const {isOpen, isLoading, readonly} = props;
    const {subscription, creditCard, bankAccount, billingHistory} = props;

    const subscriptionName = subscription?.product?.name();
    const creditCardName = creditCard?.name;
    const bankAccountName = bankAccount?.name;

    const methods = useForm<ManualPaymentHistoryRegisterForm>({
        mode: 'all',
        shouldUnregister: true,
        defaultValues: {
            subscriptionId: subscription?.id,
            creditCardId: creditCard?.id,
            bankAccountId: bankAccount?.id,
            paidAt: billingHistory?.paidAt,
            lastRequestedAt: billingHistory?.lastRequestedAt,
            payCurrency: billingHistory?.abroadPayAmount?.code || billingHistory?.payAmount?.code,
            payDate: billingHistory?.paidAt || billingHistory?.lastRequestedAt || undefined,
            billingHistoryStatus: billingHistory?.about,
        },
    });
    const {
        handleSubmit,
        reset,
        formState: {isValid, isDirty},
    } = methods;

    const onSubmit = (data: ManualPaymentHistoryRegisterForm) => {
        const {creditCardId, bankAccountId, payAmount, payCurrency} = data;
        const {subscriptionId, payDate, billingHistoryStatus} = data;

        if (!payAmount || !payCurrency) return;

        const formatPayAmount = payAmount.toString().replace(/,/g, '');

        const dto: CreateBillingHistoryByManualRequestDto = {
            subscriptionId: subscriptionId ? subscriptionId : undefined,
            creditCardId: creditCardId ? creditCardId : undefined,
            bankAccountId: bankAccountId ? bankAccountId : undefined,
            payAmount: formatPayAmount,
            payCurrency,
            paidAt: billingHistoryStatus === 'PaySuccess' ? payDate : null,
            lastRequestedAt: billingHistoryStatus === 'PayFail' ? payDate : null,
        };
        onCreate?.(dto)
            .then(() => onClose())
            .catch((e) => errorToast(e.response.data.message));
        onUpdate?.(dto)
            .then(() => onClose())
            .catch((e) => errorToast(e.response.data.message));
    };

    const isSubmitDisabled = !isValid || (!!billingHistory && !isDirty);

    const onCloseModal = () => {
        reset();
        onClose();
    };

    return (
        <BasicModal open={isOpen} onClose={onCloseModal}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-2xl modal-box keep-all ">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">
                            {billingHistory ? '직접 결제내역 수정' : '결제내역 직접 추가'}
                        </header>
                        <X className="cursor-pointer size-6" onClick={onCloseModal} />
                    </div>
                    <span className="text-gray-700 text-14">
                        "{subscriptionName || creditCardName || bankAccountName}" 결제 내역을 직접 추가할 수 있어요.
                    </span>
                </section>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
                        <div className="grid grid-cols-2 gap-6 gap-x-4 md:gap-x-8">
                            {/* 구독 */}
                            <SubscriptionContent defaultValue={subscription} readonly={readonly} />

                            {/* 결제수단 */}
                            <PaymentContent defaultValue={creditCard || bankAccount} readonly={readonly} />

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
                                isSubmitDisabled ? 'btn-disabled2' : 'btn-scordi'
                            } ${isLoading ? 'link_to-loading' : ''}`}
                        >
                            {billingHistory ? '결제내역 수정하기' : '결제내역 추가하기'}
                        </button>
                    </form>
                </FormProvider>
            </div>
        </BasicModal>
    );
});
