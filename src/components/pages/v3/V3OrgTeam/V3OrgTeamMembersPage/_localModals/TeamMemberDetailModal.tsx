import React, {memo} from 'react';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {SelectSubscriptionModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/SelectSubscriptionModal';

/**
 * [멤버관리p] 멤버 상세 모달
 */
export const TeamMemberDetailModal = memo(() => {
    const {reload} = useTeamMembersInTeamMembersTable();

    return (
        <>
            <TeamMemberShowModal onSubmit={reload} />
            <SelectSubscriptionModal onSubmit={reload} />
        </>
    );
});
