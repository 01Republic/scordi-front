import React, {ChangeEvent, memo, useRef, useState} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {Avatar} from '^components/Avatar';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {Locale} from '^types/subscriptionBillingCycle.type';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {BillingHistoryManager} from '^models/BillingHistory';
import {subscriptionApi} from '^api/subscription.api';
import {toast} from 'react-toastify';
import {useCurrentSubscriptions} from '^v3/V3OrgInvoiceAccountShowPage/atom';
import {mm_dd} from '^utils/dateTime';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {subscription} = props;
    const {product} = subscription;
    const [isActive, setIsActive] = useState(subscription.isActive);
    const {loadCurrentSubscriptions} = useCurrentSubscriptions();
    const toastTrueId = useRef<number | string>('');
    const toastFalseId = useRef<number | string>('');

    const onActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        subscriptionApi.update(subscription.id, {isActive: value}).then(() => {
            setIsActive(value);
            if (value) {
                if (!toast.isActive(toastTrueId.current)) {
                    const msg = `동기화를 시작했어요`;
                    toastTrueId.current = toast.success(msg, {toastId: 'toastTrueId'});
                }
            } else {
                if (!toast.isActive(toastFalseId.current)) {
                    const msg = `동기화를 해제했어요`;
                    toastFalseId.current = toast.success(msg, {toastId: 'toastFalseId'});
                }
            }
            loadCurrentSubscriptions(subscription.invoiceAccountId!);
        });
    };

    const BillingHistory = BillingHistoryManager.init(subscription.billingHistories);
    const lastHistory = BillingHistory.lastPaidHistory();

    return (
        <div
            className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable !transform-none"
            onClick={() => console.log(subscription)}
        >
            <Avatar src={product.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-[16px]">{product.name()}</p>
                <p className="leading-none text-[11px] text-gray-500">마지막 결제일: {mm_dd(lastHistory.issuedAt)}</p>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked={isActive}
                    onChange={onActiveChange}
                />
            </div>
        </div>
    );
});
