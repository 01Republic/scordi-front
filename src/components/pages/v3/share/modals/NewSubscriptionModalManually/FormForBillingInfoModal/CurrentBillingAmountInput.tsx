import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {UseFormReturn} from 'react-hook-form';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {CurrencyCode} from '^types/money.type';
import {useModal} from '^v3/share/modals';
import {selectedCurrencyForSubscriptionState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {currentBillingAmountCurrencyModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/FormForBillingInfoModal/CurrentBillingAmountCurrencyModal';

interface CurrentBillingAmountInputProps {
    form: UseFormReturn<CreateSubscriptionRequestDto, any>;
}

export const CurrentBillingAmountInput = memo((props: CurrentBillingAmountInputProps) => {
    const {open: openCurrencySelectModal} = useModal(currentBillingAmountCurrencyModalAtom);
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyForSubscriptionState);
    const {form} = props;

    useEffect(() => {
        const amount = form.getValues('currentBillingAmount.amount');
        const currency = selectedCurrency.label ?? CurrencyCode.USD;
        form.setValue('currentBillingAmount', {currency, amount});
    }, [selectedCurrency]);

    return (
        <div className="input input-bordered w-full flex items-center justify-between">
            <input
                type="number"
                step="0.01"
                min={0}
                className="w-full"
                onChange={(e) => {
                    const amount = Number(e.target.value);
                    const currency = form.getValues('currentBillingAmount.currency');
                    form.setValue('currentBillingAmount', {currency, amount});
                }}
            />
            <button className="cursor-pointer btn btn-sm" onClick={() => openCurrencySelectModal()}>
                {form.getValues('currentBillingAmount')?.currency ?? CurrencyCode.USD}
            </button>
        </div>
    );
});
CurrentBillingAmountInput.displayName = 'CurrentBillingAmountInput';
