import React, {memo, useEffect, useState} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    createBillingHistoryAtom,
    detailInfoModalState,
    payAmountModalState,
} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/atoms';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {useRecoilState} from 'recoil';
import {currencySelectShowModal, selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useToast} from '^hooks/useToast';
import {CurrencySelectModal} from '^v3/share/modals/BillingHistoryDetailModal/CurrencySelectModal';

export const PayAmountModal = memo(() => {
    const {Modal, isShow, close} = useModal(payAmountModalState);
    const {open: openDetailInfoModal} = useModal(detailInfoModalState);
    const {billingHistory} = useBillingHistoryInModal();
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);
    const [amount, setAmount] = useState<number>(0);
    const [abroadAmount, setAbroadAmount] = useState<number>(0);
    const {open} = useModal(currencySelectShowModal);
    const {toast} = useToast();

    const isDomestic = createBillingHistory.isDomestic;

    useEffect(() => {
        setCreateBillingHistory((prev) => ({...prev, isDomestic: true}));
        setAmount(0);
        setAbroadAmount(0);
        setSelectedCurrency({label: CurrencyCode.USD, desc: 'United States Dollar'});
    }, [isShow]);

    const onAmountChange = () => {
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
        if (!amount) {
            toast.error('결제한 금액을 입력해주세요');
            return;
        }

        onAmountChange();
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
                        새로운 결제 내역을 <br /> 등록합니다.
                    </h2>
                    <section className="flex flex-col gap-5">
                        <FormControl topLeftLabel="얼마를 사용하셨나요?">
                            <div className="input input-bordered w-full flex items-center justify-between">
                                <input
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    type="number"
                                    className="w-full"
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
                            <FormControl topLeftLabel="얼마를 사용하셨나요?">
                                <div className="input input-bordered w-full flex items-center justify-between">
                                    <input
                                        type="number"
                                        className="w-full"
                                        onChange={(e) => setAbroadAmount(Number(e.target.value))}
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
                    <AddBillingHistoryModalBtn onClick={onClick} />
                </ModalLikeBottomBar>
            </Modal>

            <CurrencySelectModal selectedCurrencyAtom={selectedCurrencyState} />
        </>
    );
});
