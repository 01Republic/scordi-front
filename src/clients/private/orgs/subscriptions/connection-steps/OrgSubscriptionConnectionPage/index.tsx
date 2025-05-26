import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {OrgSubscriptionConnectionSuccessPageRoute} from '^pages/orgs/[id]/subscriptions/connection/success';
import {subscriptionConnectedCodefBanksAtom, subscriptionConnectedCodefCardsAtom} from '^models/CodefCard/atom';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectPageTemplate, EntryPath} from '^_components/pages/assets/connect-steps';

/**
 * 구독 등록
 */
export const OrgSubscriptionConnectionPage = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    const setSuccessCodefCards = useSetRecoilState(subscriptionConnectedCodefCardsAtom);
    const setSuccessCodefBanks = useSetRecoilState(subscriptionConnectedCodefBanksAtom);

    return (
        <AssetConnectPageTemplate
            entryPath={EntryPath.Subscription}
            ConnectMethodAltActionButton={() => (
                <LinkTo
                    href={OrgSubscriptionSelectPageRoute.path(orgId)}
                    className="text-14 transition-all hover:font-semibold"
                    displayLoading={false}
                >
                    수동으로 등록하기
                </LinkTo>
            )}
            onSuccessfullyCreateByCertificate={(codefBanks, codefCards) => {
                setSuccessCodefBanks(codefBanks || []);
                setSuccessCodefCards(codefCards || []);
                router.push(OrgSubscriptionConnectionSuccessPageRoute.path(orgId));
            }}
            onSuccessfullyCreatedByAccount={(codefCards) => {
                setSuccessCodefCards(codefCards || []);
                router.push(OrgSubscriptionConnectionSuccessPageRoute.path(orgId));
            }}
        />
    );
});
