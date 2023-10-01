import React, {memo, useEffect} from 'react';
import {currencyFormat} from '^utils/number';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {BillingHistoryManager} from '^models/BillingHistory';

export const monthlyPaidAmountAtom = atom({
    key: 'monthlyPaidAmountAtom',
    default: 0,
});

export const MonthlyPaidAmount = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const {result, isLoading} = useBillingHistoriesV3();
    const [paidAmount, setPaidAmount] = useRecoilState(monthlyPaidAmountAtom);

    useEffect(() => {
        const BillingHistory = BillingHistoryManager.init(result.items).paid();
        const monthlyPaidAmount = BillingHistory.getTotalPrice(displayCurrency);
        setPaidAmount(monthlyPaidAmount.amount);
    }, [result]);

    return (
        <MobileInfoListItem label="오늘까지 결제된 금액">
            {isLoading ? 'loading...' : currencyFormat(Math.round(paidAmount), unit)}
        </MobileInfoListItem>
    );
});
