import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {monthlyBillingScheduleAtom, monthlyRemainAmountModal} from '^v3/V3OrgHomePage/MonthlyRemainAmountModal/atom';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyRemainAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyRemainAmount';
import {useBillingSchedulesV3} from '^models/BillingSchedule/hook';
import {BillingScheduleManager} from '^models/BillingSchedule/manager';
import {Clock} from 'lucide-react';

export const RemainAmount = memo(function RemainAmount() {
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
        <div className="stat bg-white shadow rounded-box" onClick={() => open()}>
            <div className="stat-figure">
                <Clock size={40} />
            </div>
            <div className="stat-title">결제예정</div>
            <div className="stat-value text-3xl text-info">
                {isLoading ? 'loading...' : Math.round(remainAmount).toLocaleString()} <small>{unit}</small>
            </div>
            {/*<div className="stat-desc">21% more than last month</div>*/}
        </div>
    );
});
