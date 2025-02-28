import React, {ChangeEvent, memo, useState} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {Avatar} from '^components/Avatar';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {subscriptionApi} from '^models/Subscription/api';
import {useCurrentSubscriptions} from '^v3/V3OrgInvoiceAccountShowPage/atom';
import {mm_dd} from '^utils/dateTime';
import {useToast} from '^hooks/useToast';
import {useRecoilValue} from 'recoil';
import {invoiceAccountIdParamState} from '^atoms/common';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const invoiceAccountId = useRecoilValue(invoiceAccountIdParamState);
    const {loadCurrentSubscriptions} = useCurrentSubscriptions();
    const {toast} = useToast();
    const {subscription} = props;
    const {product} = subscription;
    const [isActive, setIsActive] = useState(subscription.isActive);

    const onActiveChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        subscriptionApi.update(subscription.id, {isActive: value}).then(() => {
            setIsActive(value);
            if (value) {
                toast.success('동기화를 시작했어요', `subscription-${subscription.id}`);
            } else {
                toast.success('동기화를 해제했어요', `subscription-${subscription.id}`);
            }
            loadCurrentSubscriptions(invoiceAccountId);
        });
    };

    const BillingHistory = BillingHistoryManager.init(subscription.billingHistories);
    const lastPaidHistory = BillingHistory.lastPaidHistory();
    const lastHistory = BillingHistory.latestIssue().first(1).take();

    return (
        <div
            className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable !transform-none"
            onClick={() => console.log(subscription)}
        >
            <Avatar src={product.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-[16px]">{product.name()}</p>
                {lastPaidHistory ? (
                    <p className="leading-none text-[11px] text-gray-500">
                        마지막 결제일: {mm_dd(lastPaidHistory.issuedAt)}
                    </p>
                ) : lastHistory ? (
                    <p className="leading-none text-[11px] text-gray-500">마지막 알림: {mm_dd(lastHistory.issuedAt)}</p>
                ) : (
                    <p className="leading-none text-[11px] text-gray-500">결제내역이 없습니다.</p>
                )}
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked={isActive || undefined}
                    onChange={onActiveChange}
                />
            </div>
        </div>
    );
});
