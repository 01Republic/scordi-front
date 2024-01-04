import React, {memo, useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import {defaultSelectedCurrency, SelectedCurrency, selectedCurrencyState} from '../../atom';
import {CurrencySelectModal} from '../../../CurrencySelectModal';
import {useModal} from '^v3/share/modals';
import {CurrencyCode, CurrencyListV2} from '^types/money.type';

export const abroadPayAmountCurrencyModalAtom = {
    isShowAtom: atom({
        key: 'AbroadPayAmountCurrencyModal/ShowAtom',
        default: false,
    }),
    popStateSyncKey: 'AbroadPayAmountCurrencyModal',
};

/**
 * 결제내역 추가 모달 안에서 쓰이는
 * 해외결제금액 옆에 화폐 변경 기능
 */

export const AbroadPayAmountCurrencyModal = memo((props: {onChange?: (code: CurrencyCode) => void}) => {
    const {onChange} = props;
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);

    return (
        <CurrencySelectModal
            modalAtom={abroadPayAmountCurrencyModalAtom}
            defaultValue={selectedCurrency}
            onChange={(selectedOption) => {
                setSelectedCurrency(selectedOption);
                onChange && onChange(selectedOption.label);
            }}
        />
    );
});

export const CurrencyBtn = memo((props: {defaultCurrency?: CurrencyCode}) => {
    const {defaultCurrency} = props;
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);
    const {open, isShow} = useModal(abroadPayAmountCurrencyModalAtom);

    useEffect(() => {
        setSelectedCurrency(defaultSelectedCurrency);
    }, [isShow]);

    useEffect(() => {
        if (!defaultCurrency) return;
        const currencyInfo = CurrencyListV2[defaultCurrency];
        const currency: SelectedCurrency = {
            label: currencyInfo.code,
            desc: currencyInfo.desc,
        };
        setSelectedCurrency(currency);
    }, [defaultCurrency]);

    return (
        <span className="cursor-pointer btn btn-sm" onClick={open}>
            {selectedCurrency.label}
        </span>
    );
});
