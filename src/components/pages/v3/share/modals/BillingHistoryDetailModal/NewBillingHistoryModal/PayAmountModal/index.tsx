import React, {memo, useEffect, useState} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    createBillingHistoryAtom,
    detailInfoModalState,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {useRecoilState} from 'recoil';
import {currencySelectShowModal, selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useToast} from '^hooks/useToast';
import {CurrencySelectModal} from 'src/components/pages/v3/share/modals/CurrencySelectModal';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useForm} from 'react-hook-form';
import {
    AbroadPayAmountCurrencyModal,
    abroadPayAmountCurrencyModalAtom,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {ModalButton} from '^v3/share/ModalButton';

export const PayAmountModal = memo(() => {
    const {Modal, isShow, close} = useModal(payAmountModalState);
    const {open: openDetailInfoModal} = useModal(detailInfoModalState);
    const {billingHistory} = useBillingHistoryInModal();
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);
    const form = useForm<CreateBillingHistoryRequestDto>();
    const {open} = useModal(abroadPayAmountCurrencyModalAtom);
    const {toast} = useToast();

    const isDomestic = createBillingHistory.isDomestic;

    useEffect(() => {
        form.reset();
        setCreateBillingHistory((prev) => ({...prev, isDomestic: true}));
        setSelectedCurrency({label: CurrencyCode.USD, desc: 'United States Dollar'});
    }, [isShow]);

    const onAmountChange = () => {
        const amount = form.getValues('payAmount.amount');
        const abroadAmount = form.getValues('vat.amount');
        const exchangeRate = isDomestic ? 1 : amount / abroadAmount;

        const moneyLike: CreateMoneyRequestDto = {
            text: `${amount}원`,
            amount: amount,
            code: CurrencyCode.KRW,
            exchangeRate: exchangeRate,
            exchangedCurrency: isDomestic ? CurrencyCode.KRW : selectedCurrency.label,
        };

        setCreateBillingHistory((prev) => ({...prev, payAmount: moneyLike}));
    };
    const onClick = () => {
        onAmountChange();

        const amount = form.getValues('payAmount.amount');

        if (!amount) {
            toast.error('결제한 금액을 입력해주세요');
            return;
        }

        openDetailInfoModal();
    };

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar
                    backBtnOnClick={close}
                    topbarPosition="sticky"
                    title={billingHistory ? billingHistory.pageSubject : '결제 내역 등록'}
                />
                <MobileSection.Padding>
                    <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                        결제된 금액을 <br /> 입력해주세요.
                    </h2>
                    <section className="flex flex-col gap-5">
                        <FormControl topLeftLabel="얼마를 사용하셨나요?">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input
                                    onChange={(e) => form.setValue('payAmount.amount', Number(e.target.value))}
                                    type="number"
                                    className="w-full"
                                    defaultValue={form.getValues('payAmount.amount')}
                                />
                                <span>{CurrencyCode.KRW}</span>
                            </div>
                        </FormControl>

                        <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                            <ButtonGroupRadio
                                onChange={(e) => setCreateBillingHistory((prev) => ({...prev, isDomestic: e.value}))}
                                options={[
                                    {label: '국내', value: true},
                                    {label: '해외', value: false},
                                ]}
                                defaultValue={isDomestic}
                            />
                        </FormControl>

                        {!isDomestic && (
                            <FormControl topLeftLabel="얼마를 사용하셨나요22?">
                                <div className="input input-bordered w-full flex items-center justify-between">
                                    <input
                                        type="number"
                                        className="w-full"
                                        onChange={(e) => form.setValue('vat.amount', Number(e.target.value))}
                                        defaultValue={form.getValues('vat.amount')}
                                    />
                                    <span className="cursor-pointer btn btn-sm" onClick={open}>
                                        {selectedCurrency.label}
                                    </span>
                                </div>
                            </FormControl>
                        )}
                    </section>
                </MobileSection.Padding>

                <ModalLikeBottomBar className="left-0">
                    <ModalButton onClick={onClick} />
                </ModalLikeBottomBar>
            </Modal>

            <AbroadPayAmountCurrencyModal />
        </>
    );
});
