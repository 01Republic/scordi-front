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
    const {totalPage, currentPage, totalItemCount} = pagination;

    return (
        <MobileSection.Item className="border-b-0 grow">
            <MobileSection.Padding>
                <p className="py-3 text-xl font-semibold flex items-center">
                    <span className="mr-2">총</span>
                    <span className="font-bold text-scordi">{totalItemCount.toLocaleString()} 개</span>
                    <span>를 사용하고 있어요</span>
                </p>

                <hr />

                <ul className="menu menu-compact lg:menu-normal bg-base-100 block no-scrollbar">
                    {items.map((subscription, i) => (
                        <SubscriptionItem key={i} subscription={subscription} />
                    ))}
                </ul>

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
