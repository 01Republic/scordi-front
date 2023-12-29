import React, {memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {CurrencySelectModal} from '../../../modals/CurrencySelectModal';
import {selectedCurrencyForSubscriptionState} from '^v3/share/modals/BillingHistoryDetailModal/atom';

export const currentBillingAmountCurrencyModalAtom = {
    isShowAtom: atom({
        key: 'CurrentBillingAmountCurrencyModal/ShowAtom',
        default: false,
    }),
    popStateSyncKey: 'CurrentBillingAmountCurrencyModal',
};

/**
 * 신규구독추가 모달에서
 * 결제 금액 옆에 화폐 변경 기능
 */

export const CurrentBillingAmountCurrencyModal = memo(() => {
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyForSubscriptionState);

    return (
        <CurrencySelectModal
            modalAtom={currentBillingAmountCurrencyModalAtom}
            defaultValue={selectedCurrency}
            onChange={(selectedOption) => {
                setSelectedCurrency(selectedOption);
            }}
        />
    );
});
