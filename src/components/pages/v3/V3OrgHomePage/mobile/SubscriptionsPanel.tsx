import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {SubscriptionItem} from '^v3/V3OrgHomePage/mobile/SubscriptionItem';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals/useModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';

export const SubscriptionsPanel = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search} = useSubscriptionsV2();
    const {items: subscriptions, pagination} = result;
    const {totalItemCount} = pagination;
    const {open} = useModal(newAppModal);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        search({where: {isActive: true}});
    }, [orgId]);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={totalItemCount ? `${totalItemCount}개의 구독중인 앱` : '이용중인 앱'}>
                    <div className="text-sm text-gray-500">
                        <div className="cursor-pointer" onClick={open}>
                            {totalItemCount ? '앱 추가' : '앱 없음'}
                        </div>
                    </div>
                </MobileSection.Heading>

                {totalItemCount ? (
                    <>
                        {subscriptions.map((subscription, i) => (
                            <SubscriptionItem key={i} item={subscription} />
                        ))}
                    </>
                ) : (
                    <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={open} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
