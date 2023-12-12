import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {monthlyBillingHistoryAtom, monthlyPaidAmountModal} from '^v3/V3OrgHomePage/MonthlyPaidAmountModal/atom';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyPaidAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyPaidAmount';
import {FcApproval} from 'react-icons/fc';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';
import {BillingHistoryManager} from '^models/BillingHistory/manager';

export const PaidAmount = memo(function PaidAmount() {
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
        <div className="stat bg-white shadow rounded-box" onClick={() => open()}>
            <div className="stat-figure">
                <FcApproval size={40} />
            </div>
            <div className="stat-title">결제완료</div>
            <div className="stat-value text-3xl text-success">
                {isLoading ? 'loading...' : Math.round(paidAmount).toLocaleString()} <small>{unit}</small>
            </div>
            {/*<div className="stat-desc">21% more than last month</div>*/}
        </div>
    );
});
