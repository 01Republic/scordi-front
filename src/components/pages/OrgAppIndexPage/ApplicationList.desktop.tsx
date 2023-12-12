import React, {memo, useEffect} from 'react';
import {useSubscriptionList} from '^models/Subscription/hook';
import {ContentPanelBody, ContentTable} from '^layouts/ContentLayout';
import {ApplicationListItemDesktop} from '^components/pages/OrgAppIndexPage/ApplicationListItem.desktop';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const ApplicationListDesktop = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {items: subscriptions, fetchItems: fetchSubscriptions, pagination} = useSubscriptionList();

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        fetchSubscriptions(organizationId, 1, true);
    }, [organizationId]);

    return (
        <>
            {/*<ContentPanelHeading title="구독 리스트">*/}
            {/*    <ContentHeadingPrimaryButton*/}
            {/*        className="btn-sm"*/}
            {/*        onClick={() => router.push(OrgApplicationSelectPageRoute.path(organizationId))}*/}
            {/*    >*/}
            {/*        구독 추가하기*/}
            {/*    </ContentHeadingPrimaryButton>*/}
            {/*</ContentPanelHeading>*/}
            <ContentPanelBody>
                <ContentTable
                    thead={
                        <tr>
                            <th>App</th>
                            <th>Plan</th>
                            <th>Cycle</th>
                            {/*<th className="text-right">unit price</th>*/}
                            <th className="text-right">Next date</th>
                            <th className="text-right">spend</th>
                            <th></th>
                        </tr>
                    }
                >
                    {subscriptions.map((subscription, i) => (
                        <ApplicationListItemDesktop subscription={subscription} key={i} />
                    ))}
                </ContentTable>
            </ContentPanelBody>
        </>
    );
});
