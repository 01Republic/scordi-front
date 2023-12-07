import {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {currentTeamMemberState, useTeamMember} from '^models/TeamMember';
import {subscriptionApi} from '^models/Subscription/api';

export const SubscriptionListTab = memo(function SubscriptionListTab() {
    const {teamMember} = useTeamMember(currentTeamMemberState);

    useEffect(() => {
        if (!teamMember) return;

        subscriptionApi
            .index({
                where: {
                    organizationId: teamMember.organizationId,
                    // @ts-ignore
                    teamMembers: {id: teamMember.id},
                },
            })
            .then((res) => console.log(res.data));
    }, [teamMember]);

    return (
        <MobileSection.Item className="border-b-0 grow">
            <MobileSection.Padding>
                <ul className="menu menu-compact lg:menu-normal bg-base-100 block -mx-4 no-scrollbar"></ul>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
