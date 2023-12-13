import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {SubscriptionItem} from '^v3/V3OrgHomePage/mobile/SubscriptionItem';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useModal} from '^v3/share/modals/useModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {LinkTo} from '^components/util/LinkTo';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';

export const SubscriptionsPanel = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search: getSubscriptions} = useSubscriptionsV2();
    const {safePath} = useSafePathInCurrentOrg();
    const {items: subscriptions, pagination} = result;
    const {totalItemCount, totalPage, currentPage} = pagination;
    const {open} = useModal(newAppModal);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        getSubscriptions({where: {isActive: true}, itemsPerPage: 10});
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
                        {totalPage > currentPage && (
                            <LinkTo
                                href={safePath((org) => V3OrgAppsPageRoute.path(org.id))}
                                className="block w-full border-t pt-2 text-center text-xs cursor-pointer transition-all hover:text-indigo-500 hover:underline"
                            >
                                더 보기 ({currentPage + 1}/{totalPage})
                            </LinkTo>
                        )}
                    </>
                ) : (
                    <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={open} />
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
