import React, {memo, useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {FormControl} from '^components/util/form-control';
import {ButtonGroupRadio} from '^components/util/form-control/inputs/ButtonGroupRadio/ButtonGroupRadio';
import {useModal} from '^v3/share/modals';
import {
    AddBillingHistory,
    AddBillingHistoryState,
    currencySelectShowModal,
    selectedCurrencyState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {useToast} from '^hooks/useToast';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {isDomesticState} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/bodies/atom';

interface AmountBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}

export const AmountBody = memo((props: AmountBodyProps) => {
    const [isDomestic, setIsDomestic] = useRecoilState(isDomesticState);
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const [abroadAmount, setAbroadAmount] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const setAddBillingHistory = useSetRecoilState(AddBillingHistoryState);
    const {toast} = useToast();

    const {open} = useModal(currencySelectShowModal);

    const {form} = props;

    useEffect(() => {
        form.setValue('isDomestic', true);
    }, []);

    const isDomesticOptions = [
        {label: '국내', value: 'true'},
        {label: '해외', value: 'false'},
    ];

    const onAmountChange = () => {
        const exchangeRate = isDomestic ? 1 : amount / abroadAmount;

        const moneyLike: CreateMoneyRequestDto = {
            text: `${amount}원`,
            amount: amount,
            code: CurrencyCode.KRW,
            exchangeRate: exchangeRate,
            exchangedCurrency: isDomestic ? CurrencyCode.KRW : selectedCurrency.label,
        };

        form.setValue('payAmount', moneyLike);
    };

    const onClick = () => {
        if (!amount) {
            toast.error('결제한 금액을 입력해주세요');
            return;
        }
        onAmountChange();

        setAddBillingHistory(AddBillingHistory.DetailInfo);
    };

    return (
        <>
            <FormControl topLeftLabel="얼마를 사용하셨나요?">
                <div className="input input-bordered w-full flex items-center justify-between">
                    <input onChange={(e) => setAmount(Number(e.target.value))} type="number" className="w-full" />
                    <span>{CurrencyCode.KRW}</span>
                </div>
            </FormControl>

            <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                <ButtonGroupRadio
                    onChange={(e) => {
                        const selectedValue = e.value === 'true';
                        form.setValue('isDomestic', selectedValue);

                        setIsDomestic(selectedValue);
                    }}
                    options={isDomesticOptions}
                    defaultValue={isDomesticOptions[0]}
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

            <AddBillingHistoryModalBtn onClick={onClick} />
        </>
    );
});
