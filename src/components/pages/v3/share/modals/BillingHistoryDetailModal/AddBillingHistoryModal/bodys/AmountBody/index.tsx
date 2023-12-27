import {ChangeEvent, memo, useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {FormControl} from '^components/util/form-control';
import {ButtonGroupRadio} from '^components/util/form-control/inputs/ButtonGroupRadio/ButtonGroupRadio';
import {useModal} from '^v3/share/modals';
import {currencySelectShowModal, selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useRecoilState} from 'recoil';
import {CreateMoneyRequestDto, Currency} from '^types/money.type';

interface AmountBodyProps {
    form: UseFormReturn<CreateBillingHistoryRequestDto>;
}

export const AmountBody = memo((props: AmountBodyProps) => {
    const [isDomestic, setIsDomestic] = useState<boolean>(true);
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);

    const {open} = useModal(currencySelectShowModal);

    const {form} = props;

    const isDomesticOptions = [
        {label: '국내', value: 'true'},
        {label: '해외', value: 'false'},
    ];

    const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const moneyLike: CreateMoneyRequestDto = {
            text: `${e.target.value}원`,
            amount: Number(e.target.value),
            code: Currency.KRW,
            exchangeRate: 1,
        };
        form.setValue('payAmount', moneyLike);
    };

    return (
        <>
            <FormControl topLeftLabel="얼마를 사용하셨나요?">
                <div className="input input-bordered w-full flex items-center justify-between">
                    <input className="hidden" {...form.register('payAmount')}></input>
                    <input onChange={(e) => onAmountChange(e)} type="number" className="w-full" />
                    <span>KRW</span>
                </div>
            </FormControl>

            <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                <input className="hidden" {...form.register('isDomestic')} />
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
                        <input type="number" className="w-full" {...form.register('payAmount')} />
                        <span className="cursor-pointer btn btn-sm w- text-end" onClick={open}>
                            {selectedCurrency.label}
                        </span>
                    </div>
                </FormControl>
            )}
        </>
    );
});
