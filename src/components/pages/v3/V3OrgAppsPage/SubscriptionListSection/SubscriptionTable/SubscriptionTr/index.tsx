import {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {SubscriptionDto} from '^models/Subscription/types';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {
    LatestPayAmount,
    MasterProfile,
    MemberCount,
    NextPaymentDate,
    PayingType,
    ProductProfile,
    SubscriptionStatus,
} from './columns';
import {useModal} from '^v3/share/modals/useModal';
import {appShowPageModal} from '^v3/V3OrgAppShowPage/modals/AppShowPageModal';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';

interface SubscriptionTrProps {
    subscription: SubscriptionDto;
}

export const SubscriptionTr = memo((props: SubscriptionTrProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {open: openSubscriptionShowPageModal} = useModal(appShowPageModal);
    const setAppId = useSetRecoilState(appIdState);
    const {subscription} = props;

    const BillingHistory = BillingHistoryManager.init(subscription.billingHistories || []);
    const latestIssue = BillingHistory.paymentOnly().latestIssue();
    const totalPrice = latestIssue.getTotalPrice(displayCurrency);
    const lastPaidHistory = BillingHistory.lastPaidHistory();

    // TODO: paidAt 에 문제가 있음. (1) 시간이 안나옴. (2) issuedAt 과 날짜가 다름(시간잘리는과정에서 생긴문제일듯). (3) issuedAt 보다 신뢰도가 떨어짐.
    const lastPaidAt = lastPaidHistory ? new Date(lastPaidHistory.issuedAt) : null;
    const nextPayDate = subscription.getNextPayDate(lastPaidAt);
    const nextPayAmount = subscription.getNextPayAmount(lastPaidHistory);

    const openDetail = () => {
        setAppId(subscription.id);
        openSubscriptionShowPageModal();
    };

    return (
        <tr>
            {/*<td></td>*/}
            <td className="group cursor-pointer" onClick={openDetail}>
                <ProductProfile subscription={subscription} />
            </td>
            <td className="text-center">
                <SubscriptionStatus
                    subscription={subscription}
                    lastPaidAt={lastPaidAt}
                    nextPayDate={nextPayDate}
                    nextPayAmount={nextPayAmount}
                />
            </td>
            <td className="">
                <MasterProfile subscription={subscription} />
            </td>
            <td className="text-center">
                <PayingType subscription={subscription} />
            </td>
            <td className="text-right">
                <MemberCount subscription={subscription} />
            </td>
            <td className="text-right">
                <LatestPayAmount latestBillingHistory={lastPaidHistory} />
            </td>
            <td className="text-right">
                <NextPaymentDate nextPayDate={nextPayDate} />
            </td>
            <td></td>
        </tr>
    );
});
SubscriptionTr.displayName = 'SubscriptionTr';
