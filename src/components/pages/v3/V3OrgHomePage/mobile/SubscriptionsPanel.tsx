import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {AddButton} from '^v3/V3OrgHomePage/mobile/AddButton';
import {SubscriptionItem} from '^v3/V3OrgHomePage/mobile/SubscriptionItem';
import {useRouter} from 'next/router';
import {V3OrgAppsNewPageRoute} from '^pages/v3/orgs/[orgId]/apps/new';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const SubscriptionsPanel = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {result: subscriptionsResult, search} = useSubscriptionsV2();
    const subscriptions = subscriptionsResult.items;
    const length = subscriptions.length;

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        search({where: {isActive: true}});
    }, [orgId]);

    const onAddButtonClick = () => {
        router.push(V3OrgAppsNewPageRoute.path(orgId));
    };

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={length ? `${length}개의 구독중인 앱` : '이용중인 앱'}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" onClick={onAddButtonClick}>
                            {length ? '앱 추가' : '앱 없음'}
                        </div>
                    </div>
                </MobileSection.Heading>

                {length ? (
                    <>
                        {subscriptions.map((subscription, i) => (
                            <SubscriptionItem key={i} item={subscription} />
                        ))}
                    </>
                ) : (
                    <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={onAddButtonClick} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
