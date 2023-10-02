import React, {memo, useEffect} from 'react';
import {currencyFormat} from '^utils/number';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useBillingSchedulesV3} from '^hooks/useBillingSchedules';
import {BillingScheduleManager} from '^models/BillingSchedule';

export const monthlyRemainAmountAtom = atom({
    key: 'monthlyRemainAmountAtom',
    default: 0,
});

export const MonthlyRemainAmount = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const {result, isLoading} = useBillingSchedulesV3();
    const [remainAmount, setRemainAmount] = useRecoilState(monthlyRemainAmountAtom);

    useEffect(() => {
        const BillingSchedule = BillingScheduleManager.init(result.items).validateToListing();
        const monthlyRemainAmount = BillingSchedule.uniqByIdentity().getTotalPrice(displayCurrency);
        setRemainAmount(monthlyRemainAmount);
    }, [result]);

    return (
        <MobileInfoListItem label="남은 결제 금액">
            {isLoading ? 'loading...' : currencyFormat(Math.round(remainAmount), unit)}
        </MobileInfoListItem>
    );
});
