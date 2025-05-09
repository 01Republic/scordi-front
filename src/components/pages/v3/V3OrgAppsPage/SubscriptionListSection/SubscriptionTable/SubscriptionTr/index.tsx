import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {SubscriptionDto} from '^models/Subscription/types';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {useAppShowModal} from 'src/components/pages/v3/share/modals/AppShowPageModal';
import {
    // NextPaymentDate,
    PayingType,
    // ProductProfile,
    // SubscriptionStatus,
    MasterSelect,
    IsFreeTierColumn,
    BillingCycleTypeColumn,
} from './columns';
import {SubscriptionProfile, PayMethodSelect, LatestPayAmount, MemberCount} from '^models/Subscription/components';

interface SubscriptionTrProps {
    subscription: SubscriptionDto;
    reload?: () => any;
    // search?: (params: FindAllQueryDto<SubscriptionDto>, mergeMode?: boolean, force?: boolean) => Promise<void>;
    // query?: FindAllQueryDto<SubscriptionDto>;
}

export const SubscriptionTr = memo((props: SubscriptionTrProps) => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const appShowModal = useAppShowModal();
    const {subscription, reload} = props;

    // const BillingHistory = BillingHistoryManager.init(subscription.billingHistories || []);
    // const latestIssue = BillingHistory.paymentOnly().latestIssue();
    // const totalPrice = latestIssue.getTotalPrice(displayCurrency);
    // const lastPaidHistory = BillingHistory.lastPaidHistory();

    // TODO: paidAt 에 문제가 있음. (1) 시간이 안나옴. (2) issuedAt 과 날짜가 다름(시간잘리는과정에서 생긴문제일듯). (3) issuedAt 보다 신뢰도가 떨어짐.
    // const lastPaidAt = lastPaidHistory ? new Date(lastPaidHistory.issuedAt) : null;
    // const nextPayDate = subscription.getNextPayDate(lastPaidAt);
    // const nextPayAmount = subscription.getNextPayAmount(lastPaidHistory);

    const openDetail = () => {
        appShowModal.show(subscription.id);
    };

    return (
        <tr>
            {/* Checkbox */}
            {/*<td></td>*/}

            {/* 서비스 명 */}
            <td className="group cursor-pointer" onClick={openDetail}>
                <SubscriptionProfile subscription={subscription} />
            </td>

            {/* 유/무료 */}
            <td>
                <IsFreeTierColumn subscription={subscription} onChange={() => reload && reload()} />
            </td>

            {/* 상태 */}
            {/*<td className="">*/}
            {/*    <SubscriptionStatus subscription={subscription} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* 결제주기 */}
            <td>
                <BillingCycleTypeColumn subscription={subscription} onChange={() => reload && reload()} />
            </td>

            {/* 과금방식: (TestBank: 연, 고정, 사용량, 크레딧, 1인당) */}
            <td className="">
                <PayingType subscription={subscription} onChange={() => reload && reload()} />
            </td>

            {/* 결제수단 */}
            <td className="pl-3 py-0">
                <PayMethodSelect subscription={subscription} onChange={() => reload && reload()} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

            {/* 최신 결제금액 */}
            <td className="text-right">
                <LatestPayAmount subscription={subscription} />
            </td>

            {/* 다음 결제일 */}
            {/*<td className="text-right">*/}
            {/*    <NextPaymentDate nextPayDate={nextPayDate} />*/}
            {/*</td>*/}

            {/* 담당자 */}
            <td className="py-0 pl-5 w-40">
                <MasterSelect subscription={subscription} onChange={() => reload && reload()} />
            </td>

            {/* Actions */}
            {/*<td></td>*/}
        </tr>
    );
});
SubscriptionTr.displayName = 'SubscriptionTr';
