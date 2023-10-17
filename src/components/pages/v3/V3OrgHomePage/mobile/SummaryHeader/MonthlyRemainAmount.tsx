import React, {memo, useEffect} from 'react';
import {currencyFormat} from '^utils/number';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useBillingSchedulesV3} from '^hooks/useBillingSchedules';
import {BillingScheduleManager} from '^models/BillingSchedule';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyBillingScheduleAtom, monthlyRemainAmountModal} from '^v3/V3OrgHomePage/MonthlyRemainAmountModal/atom';

export const monthlyRemainAmountAtom = atom({
    key: 'monthlyRemainAmountAtom',
    default: 0,
});

export const MonthlyRemainAmount = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const {result, isLoading} = useBillingSchedulesV3();
    const [remainAmount, setRemainAmount] = useRecoilState(monthlyRemainAmountAtom);
    const setSchedules = useSetRecoilState(monthlyBillingScheduleAtom);
    const {open} = useModal(monthlyRemainAmountModal);

    useEffect(() => {
        const BillingSchedule = BillingScheduleManager.init(result.items).validateToListing().uniqByIdentity();
        const monthlyRemainAmount = BillingSchedule.getTotalPrice(displayCurrency);
        setSchedules(BillingSchedule.all());
        setRemainAmount(monthlyRemainAmount);
    }, [result]);

    return (
        <MobileInfoListItem label="남은 결제 금액" onClick={open}>
            {isLoading ? 'loading...' : currencyFormat(Math.round(remainAmount), unit)}
        </MobileInfoListItem>
    );
});
