import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {currentTeamMemberState, useTeamMember} from '^models/TeamMember';
import {
    pagedSubscriptionForTeamMemberShowModalState as resultAtom,
    subscriptionQueryForTeamMemberShowModalState as queryAtom,
} from './atom';
import {SubscriptionItem} from './SubscriptionItem';
import {LoadMoreButton} from './LoadMoreButton';
import {useSubscriptionsV3} from '^models/Subscription/hook';

export const SubscriptionListTab = memo(function SubscriptionListTab() {
    const {teamMember} = useTeamMember(currentTeamMemberState);
    const {result, search} = useSubscriptionsV3(resultAtom, queryAtom);

    useEffect(() => {
        if (!teamMember) return;

        search({
            where: {
                organizationId: teamMember.organizationId,
                // @ts-ignore
                teamMembers: {id: teamMember.id},
            },
        });
    }, [teamMember]);

    const {items, pagination} = result;
    const {totalPage, currentPage} = pagination;

    return (
        <MobileSection.Item className="border-b-0 grow">
            <MobileSection.Padding>
                <ul className="menu menu-compact lg:menu-normal bg-base-100 block no-scrollbar">
                    {items.map((subscription, i) => (
                        <SubscriptionItem key={i} subscription={subscription} />
                    ))}
                </ul>

                {totalPage > currentPage && <LoadMoreButton />}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
