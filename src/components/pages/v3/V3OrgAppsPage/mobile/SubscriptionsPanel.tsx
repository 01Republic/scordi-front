import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionsV2} from '^models/Subscription/hook';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {useModal} from '^v3/share/modals';
import {newAppModal} from '^v3/share/modals/NewAppModal/atom';
import {SubscriptionItem} from '^v3/V3OrgHomePage/mobile/SubscriptionItem';
import {LinkTo} from '^components/util/LinkTo';
import {LoadMoreButton} from './LoadMoreButton';

export const SubscriptionsPanel = memo(function SubscriptionsPanel() {
    const orgId = useRecoilValue(orgIdParamState);
    const {result, search: getSubscriptions} = useSubscriptionsV2();
    const {items: subscriptions, pagination} = result;
    const {totalItemCount, totalPage, currentPage} = pagination;
    const {open} = useModal(newAppModal);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        getSubscriptions({where: {isActive: true}});
    }, [orgId]);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                {subscriptions.map((subscription, i) => (
                    <SubscriptionItem key={i} item={subscription} />
                ))}
                {totalPage > currentPage ? (
                    <LoadMoreButton />
                ) : (
                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
