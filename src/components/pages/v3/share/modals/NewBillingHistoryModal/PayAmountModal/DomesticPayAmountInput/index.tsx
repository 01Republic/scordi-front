import React, {memo, useRef} from 'react';
import {CurrencyCode} from '^models/Money';
import {FormControl} from '^components/util/form-control';
import {useSetRecoilState} from 'recoil';
import {domesticPayAmount} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {inputTextToCurrencyFormat} from '^utils/input-helper';

export const DomesticPayAmountInput = memo(() => {
    const inputRef = useRef<HTMLInputElement>(null);
    const setDomesticPayAmount = useSetRecoilState(domesticPayAmount);

    const onAmountChange = (amount: number) => {
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
                <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    className="w-full"
                    defaultValue={0}
                    onChange={(e) => {
                        onAmountChange(inputTextToCurrencyFormat(e));
                    }}
                />
                <span>{CurrencyCode.KRW}</span>
            </div>
        </FormControl>
    );
});
