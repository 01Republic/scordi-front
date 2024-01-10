import React, {memo, useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import {selectedCurrencyState} from '../../BillingHistoryDetailModal/atom';
import {CurrencySelectModal} from '../../CurrencySelectModal';

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

export const AbroadPayAmountCurrencyModal = memo(() => {
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);

    return (
        <CurrencySelectModal
            modalAtom={abroadPayAmountCurrencyModalAtom}
            defaultValue={selectedCurrency}
            onChange={(selectedOption) => {
                setSelectedCurrency(selectedOption);
            }}
        />
    );
});
