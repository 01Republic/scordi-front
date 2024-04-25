import {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {monthlyBillingHistoryAtom, monthlyPaidAmountModal} from './atom';
import {useRecoilValue} from 'recoil';
import {HistoryItem} from './HistoryItem';
import {monthlyPaidAmountAtom} from '^v3/V3OrgHomePage/mobile/SummaryHeader/MonthlyPaidAmount';
import {currencyFormat} from '^utils/number';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {getCurrencyUnit} from '^api/tasting.api/gmail/agent/parse-email-price';

export const MonthlyPaidAmountModal = memo(() => {
    const {Modal, CloseButton} = useModal(monthlyPaidAmountModal);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const unit = getCurrencyUnit(displayCurrency);
    const histories = useRecoilValue(monthlyBillingHistoryAtom);
    const paidAmount = useRecoilValue(monthlyPaidAmountAtom);

    return (
        <Modal>
            <h3 className="text-xl font-semibold mb-4">오늘까지 결제된 금액</h3>
            <CloseButton className="absolute top-4 right-4" />

            <ul className="menu menu-compact lg:menu-normal bg-base-100">
                {histories.map((history, i) => (
                    <HistoryItem history={history} key={i} />
                ))}
            </ul>

            <hr />

            <p className="py-3 text-xl font-semibold flex items-center justify-between">
                <span>합계</span>
                <span>{currencyFormat(Math.round(paidAmount), unit)}</span>
            </p>
        </Modal>
    );
});
