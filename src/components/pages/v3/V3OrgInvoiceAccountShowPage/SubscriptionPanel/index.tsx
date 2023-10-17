import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentSubscriptions} from '^v3/V3OrgInvoiceAccountShowPage/atom';
import {SubscriptionItem} from '^v3/V3OrgInvoiceAccountShowPage/SubscriptionPanel/SubscriptionItem';
import {useRecoilValue} from 'recoil';
import {invoiceAccountIdParamState} from '^atoms/common';

export const SubscriptionPanel = memo(() => {
    const invoiceAccountId = useRecoilValue(invoiceAccountIdParamState);
    const {subscriptions, loadCurrentSubscriptions} = useCurrentSubscriptions();
    const activeSubscriptions = subscriptions.filter((s) => s.isActive);
    const length = activeSubscriptions.length;

    useEffect(() => {
        if (!invoiceAccountId || isNaN(invoiceAccountId)) return;
        loadCurrentSubscriptions(invoiceAccountId);
    }, [invoiceAccountId]);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={`${length}개의 결제알림을 받고있어요`}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" />
                    </div>
                </MobileSection.Heading>

                {subscriptions.map((subscription, i) => (
                    <SubscriptionItem subscription={subscription} key={i} />
                ))}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
