import React, {memo, useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals';
import {CreateMoneyWithSubscriptionRequestDto, CurrencyCode} from '^types/money.type';
import {selectedCurrencyForSubscriptionState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {currentBillingAmountCurrencyModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/FormForBillingInfoModal/CurrentBillingAmountCurrencyModal';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

interface CurrentBillingAmountInputProps {}

export const CurrentBillingAmountInput = memo((props: CurrentBillingAmountInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const selectedCurrency = useRecoilValue(selectedCurrencyForSubscriptionState);
    const {open: openCurrencySelectModal} = useModal(currentBillingAmountCurrencyModalAtom);

    useEffect(() => {
        onCurrencyChange(selectedCurrency.label ?? CurrencyCode.USD);
    }, [selectedCurrency]);

    const onAmountChange = (amount: number) => {
        setFormData((f) => {
            const currencyBillingAmount = {...f.currentBillingAmount} as CreateMoneyWithSubscriptionRequestDto;
            return {...f, currentBillingAmount: {...currencyBillingAmount, amount}};
        });
    };

    const onCurrencyChange = (currency: CurrencyCode) => {
        setFormData((f) => {
            const currencyBillingAmount = {...f.currentBillingAmount} as CreateMoneyWithSubscriptionRequestDto;
            return {...f, currentBillingAmount: {...currencyBillingAmount, currency}};
        });
    };

    return (
        <div className="input input-bordered w-full flex items-center justify-between">
            <input
                ref={inputRef}
                type="number"
                step="0.01"
                min={0}
                className="w-full"
                onChange={(e) => {
                    const amount = Number(e.target.value);
                    onAmountChange(amount);
                }}
            />
            <button className="cursor-pointer btn btn-sm" onClick={() => openCurrencySelectModal()}>
                {formData.currentBillingAmount?.currency ?? CurrencyCode.USD}
            </button>
        </div>
    );
});
CurrentBillingAmountInput.displayName = 'CurrentBillingAmountInput';
