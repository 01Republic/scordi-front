import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {useSubscriptionsV2} from '^hooks/useSubscriptions';
import {useInvoiceAccounts} from '^hooks/useInvoiceAccounts';
import {AddButton} from '^v3/V3OrgHomePage/mobile/AddButton';
import {SubscriptionItem} from '^v3/V3OrgHomePage/mobile/SubscriptionItem';

export const SubscriptionsPanel = memo(() => {
    const {result: subscriptionsResult, search} = useSubscriptionsV2();
    const {result: invoiceAccountsResult} = useInvoiceAccounts();
    const subscriptions = subscriptionsResult.items;
    const accounts = invoiceAccountsResult.items;
    const invoiceApps = accounts.flatMap((account) => account.invoiceApps);
    const length = subscriptions.length + invoiceApps.length;

    useEffect(() => {
        search({});
    }, []);

    const onAddButtonClick = () => {
        console.log({subscriptionsResult, invoiceAccountsResult});
    };

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={length ? `${length}개의 구독중인 앱` : '이용중인 앱'}>
                    <div className="text-sm text-gray-500">
                        <div>{length ? '앱 추가' : '앱 없음'}</div>
                    </div>
                </MobileSection.Heading>

                {length ? (
                    <>
                        {subscriptions.map((subscription, i) => (
                            <SubscriptionItem key={i} item={subscription} />
                        ))}

                        {invoiceApps.map((invoiceApp, i) => (
                            <SubscriptionItem key={i} item={invoiceApp} />
                        ))}
                        <AddButton title="앱 더 추가하기" onClick={onAddButtonClick} />
                    </>
                ) : (
                    <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
