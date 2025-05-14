import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {subscriptionConnectedCodefCardsAtom} from '^models/CodefCard/atom';
import {AssetConnectPageTemplate} from '^_components/pages/assets/connect-steps';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {OrgSubscriptionConnectionSuccessPageRoute} from '^pages/orgs/[id]/subscriptions/connection/success';

/**
 * 구독 등록
 */
export const OrgSubscriptionConnectionPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setSuccessCodefCards = useSetRecoilState(subscriptionConnectedCodefCardsAtom);

    return (
        <AssetConnectPageTemplate
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgSubscriptionSelectPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    수동으로 등록하기
                </LinkTo>
            )}
            onSuccessfullyCreatedByAccount={(codefCards) => {
                setSuccessCodefCards(codefCards);
                router.push(OrgSubscriptionConnectionSuccessPageRoute.path(orgId));
            }}
        />
    );
});
