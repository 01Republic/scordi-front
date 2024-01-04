import React, {memo} from 'react';
import {CreateMoneyRequestDto, CurrencyCode} from '^types/money.type';
import {FormControl} from '^components/util/form-control';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
    abroadPayAmount,
    createBillingHistoryAtom,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';

export const DomesticPayAmountInput = memo(() => {
    const abroadAmount = useRecoilValue(abroadPayAmount);
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);
    const isDomestic = createBillingHistory.isDomestic;

    const onAmountChange = (amount: number) => {
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

    return (
        <FormControl
            topLeftLabel={
                <p className="flex items-center gap-1">
                    얼마가 결제되었나요? <span className="text-red-500 self-center">*</span>
                </p>
            }
        >
            <div className="input input-bordered w-full flex items-center justify-between">
                <input onChange={(e) => onAmountChange(Number(e.target.value))} type="number" className="w-full" />
                <span>{CurrencyCode.KRW}</span>
            </div>
        </FormControl>
    );
});
