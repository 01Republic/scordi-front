import {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyBillingScheduleAtom, monthlyRemainAmountModal} from './atom';
import {useRecoilValue} from 'recoil';
import {currencyFormat} from '^utils/number';
import {monthlyRemainAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyRemainAmount';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';
import {ScheduleItem} from './ScheduleItem';

export const MonthlyRemainAmountModal = memo(() => {
    const {Modal, CloseButton} = useModal(monthlyRemainAmountModal);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const schedules = useRecoilValue(monthlyBillingScheduleAtom);
    const remainAmount = useRecoilValue(monthlyRemainAmountAtom);

    return (
        <Modal>
            <h3 className="text-xl font-semibold mb-4">남은 결제 금액</h3>
            <CloseButton className="absolute top-4 right-4" />

            <ul className="menu menu-compact lg:menu-normal bg-base-100">
                {schedules.map((schedule, i) => (
                    <ScheduleItem schedule={schedule} key={i} />
                ))}
            </ul>

            <hr />

            <p className="py-3 text-xl font-semibold flex items-center justify-between">
                <span>합계</span>
                <span>{currencyFormat(Math.round(remainAmount), unit)}</span>
            </p>
        </Modal>
    );
});
