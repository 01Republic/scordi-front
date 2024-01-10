import React, {memo, useEffect} from 'react';
import {CurrencyCode, CurrencyListV2} from '^models/Money';
import {useRecoilState} from 'recoil';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useModal} from '^v3/share/modals';
import {abroadPayAmountCurrencyModalAtom} from '^v3/share/modals/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountCurrencyModal';

interface BillingHistoryAbroadCurrencyProps {
    currencyCode?: CurrencyCode;
    onChange: (code: CurrencyCode) => void;
}

export const BillingHistoryEditAbroadCurrencyButton = memo((props: BillingHistoryAbroadCurrencyProps) => {
    const {currencyCode, onChange} = props;
    const {open} = useModal(abroadPayAmountCurrencyModalAtom);
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);

    useEffect(() => {
        if (!currencyCode) return;

        const currencyOption = {
            label: currencyCode,
            desc: CurrencyListV2[currencyCode].desc,
        };
        setSelectedCurrency(currencyOption);
    }, [currencyCode]);

    useEffect(() => {
        onChange(selectedCurrency.label);
    }, [selectedCurrency]);

    return (
        <span className="cursor-pointer btn btn-sm" onClick={open}>
            {selectedCurrency.label}
        </span>
    );
});
