import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useAppShowModal} from '^v3/share/modals/AppShowPageModal';
import {
    BillingCycleTypeColumn,
    ProductProfile,
} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns';
import {yyyy_mm_dd} from '^utils/dateTime';
import {MoneySimpleRounded} from '^models/Money/components/money.simple-rounded';
import {CreditCardLastNumTag} from './CreditCardLastNumTag';

/** 계정으로 조회된 구독 */
export const SubscriptionItem = memo((props: {data: SubscriptionDto}) => {
    const appShowModal = useAppShowModal();
    const {data: subscription} = props;

    return (
        <div className="border-b px-3 py-4 last:border-b-0 grid grid-cols-7">
            <div className="col-span-2">
                <ProductProfile subscription={subscription} />
            </div>
            <div className="flex items-center justify-start">
                <CreditCardLastNumTag subscription={subscription} />
            </div>
            <div className="flex items-center justify-start">
                <BillingCycleTypeColumn subscription={subscription} onChange={console.log} />
            </div>
            <div className="flex items-center justify-end">
                <MoneySimpleRounded money={subscription.currentBillingAmount || undefined} />
            </div>
            <div className="text-14 flex items-center justify-end">
                {subscription.lastPaidAt && yyyy_mm_dd(subscription.lastPaidAt)}
            </div>

            <div className="flex items-center justify-end">
                <button className="btn btn-scordi btn-sm" onClick={() => appShowModal.show(subscription.id)}>
                    상세
                </button>
            </div>
        </div>
    );
});
