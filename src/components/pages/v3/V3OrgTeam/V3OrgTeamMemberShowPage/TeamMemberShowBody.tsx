import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentTeamMember, useEditTeamMember} from '^models/TeamMember/hook';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {TeamMemberInfoPanel} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/TeamMemberInfoPanel';
import {TeamListPanel} from '^v3/V3OrgTeam/V3OrgTeamsPage/mobile/TeamListPanel';

export const TeamMemberShowBody = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<UpdateTeamMemberDto>();
    const {isLoading} = useCurrentTeamMember();
    const {updateFn} = useEditTeamMember(form, orgId);

    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>
                    <TeamMemberInfoPanel form={form} onSubmit={updateFn} />
                    <TeamListPanel />
                    {/*<TeamMemberSubscriptionListPanel />*/}
                </>
            )}
        </>
    );
});
