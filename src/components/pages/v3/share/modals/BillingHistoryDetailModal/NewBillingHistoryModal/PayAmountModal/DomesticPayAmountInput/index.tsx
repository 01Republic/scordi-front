import React, {memo} from 'react';
import {CurrencyCode} from '^types/money.type';
import {FormControl} from '^components/util/form-control';
import {useSetRecoilState} from 'recoil';
import {domesticPayAmount} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

export const DomesticPayAmountInput = memo(() => {
    const setDomesticPayAmount = useSetRecoilState(domesticPayAmount);

    const onAmountChange = (amount: number) => {
        if (!amount) return;

        setDomesticPayAmount(amount);
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
