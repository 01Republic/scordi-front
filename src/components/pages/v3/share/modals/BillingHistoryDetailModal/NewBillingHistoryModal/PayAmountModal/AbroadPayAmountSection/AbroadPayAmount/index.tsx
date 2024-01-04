import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FormControl} from '^components/util/form-control';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useModal} from '^v3/share/modals';
import {abroadPayAmountCurrencyModalAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';
import {abroadPayAmount} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

export const AbroadPayAmount = memo(() => {
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const setAbroadPayAmount = useSetRecoilState(abroadPayAmount);
    const {open} = useModal(abroadPayAmountCurrencyModalAtom);

    const onChange = (amount: number) => {
        if (!amount) return;

        setAbroadPayAmount(amount);
    };

    return (
        <FormControl topLeftLabel="해외 결제 금액을 입력해주세요">
            <div className="input input-bordered w-full flex items-center justify-between">
                <input type="number" className="w-full" onChange={(e) => onChange(Number(e.target.value))} />
                <span className="cursor-pointer btn btn-sm" onClick={open}>
                    {selectedCurrency.label}
                </span>
            </div>
        </FormControl>
    );
});
