import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentTeamMember, useEditTeamMember} from '^models/TeamMember/hook';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import React, {memo, useEffect} from 'react';
import {TeamMemberInfoPanel} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/TeamMemberInfoPanel';
import {TeamListPanel} from '^v3/V3OrgTeam/V3OrgTeamsPage/mobile/TeamListPanel';

export const TeamMemberShowBody = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentTeamMember: member, isLoading} = useCurrentTeamMember();
    const form = useForm<UpdateTeamMemberDto>();
    const {updateFn} = useEditTeamMember(form, orgId);

    useEffect(() => {
        if (!member) return;

        const {name, jobName, phone, email} = member.makeTeamMemberProfile();

        form.setValue('name', name);
        form.setValue('jobName', jobName);
        form.setValue('phone', phone);
        form.setValue('email', email);
    }, [member]);

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
