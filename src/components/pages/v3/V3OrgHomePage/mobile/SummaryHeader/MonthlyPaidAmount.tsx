import React, {memo, useEffect} from 'react';
import {currencyFormat} from '^utils/number';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyBillingHistoryAtom, monthlyPaidAmountModal} from '^v3/V3OrgHomePage/MonthlyPaidAmountModal/atom';

export const monthlyPaidAmountAtom = atom({
    key: 'monthlyPaidAmountAtom',
    default: 0,
});

export const MonthlyPaidAmount = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const {result, isLoading} = useBillingHistoriesV3();
    const [paidAmount, setPaidAmount] = useRecoilState(monthlyPaidAmountAtom);
    const setHistories = useSetRecoilState(monthlyBillingHistoryAtom);
    const {open} = useModal(monthlyPaidAmountModal);

    useEffect(() => {
        const BillingHistory = BillingHistoryManager.init(result.items).paid().uniqByIdentity();
        const monthlyPaidAmount = BillingHistory.getTotalPrice(displayCurrency);
        setHistories(BillingHistory.all());
        setPaidAmount(monthlyPaidAmount);
    }, [result]);

    return (
        <MobileInfoListItem label="오늘까지 결제된 금액" onClick={open}>
            {isLoading ? 'loading...' : currencyFormat(Math.round(paidAmount), unit)}
        </MobileInfoListItem>
    );
});
