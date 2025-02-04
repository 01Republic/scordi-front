import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {MonoSelect} from '^components/ui/inputs/MonoSelect';
import {currencyListV4} from '^clients/private/_modals/CurrencySelectModal';
import {createSubscriptionFormData} from '../atom';
import {CurrencyCode} from '^models/Money';

interface CurrencySelectProps {
    defaultValue?: CurrencyCode;
    onChange?: (currency: string) => void;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const currencyCode = formData.currentBillingAmount?.currency;
    const currency = currencyListV4.find((c) => c.code === currencyCode) || currencyListV4[0];

    return (
        <label>
            <p className="text-11 text-gray-500 mb-1">화폐단위</p>
            <MonoSelect
                options={currencyListV4}
                onChange={(selected) => {
                    props.onChange?.(selected ? selected.code : currency.code);
                    setFormData((f) => ({
                        ...f,
                        currentBillingAmount: {
                            amount: f.currentBillingAmount?.amount || 0,
                            currency: selected ? selected.code : currency.code,
                        },
                    }));
                }}
                getLabel={(c) => c.unit}
                getValue={(c) => c.code}
                defaultValue={props.defaultValue || currency.code}
                modalTitle="화폐 단위를 선택해주세요."
                size="md"
                OptionComponent={({option}) => {
                    return (
                        <>
                            <p className="font-medium text-14">{option.name}</p>
                            {option.isDefault ? (
                                <p className="text-12">기본 화폐 단위</p>
                            ) : (
                                <p className="text-12">
                                    1{option.unit} 당 {option.exchangeRate.toLocaleString()}원
                                </p>
                            )}
                        </>
                    );
                }}
            />
        </label>
    );
});
