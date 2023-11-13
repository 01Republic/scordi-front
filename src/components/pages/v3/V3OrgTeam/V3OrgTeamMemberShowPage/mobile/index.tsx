import React, {memo, useEffect} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {TeamMemberInfoPanel} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/TeamMemberInfoPanel';
import {TeamListPanel} from '^v3/V3OrgTeam/V3OrgTeamsPage/mobile/TeamListPanel';
import {makeTeamMemberProfile, useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';
import {DeleteTriggerButton, EditTriggerButton} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {UpdateTeamMemberDto} from '^models/TeamMember/types/team-member.type';
import {teamMemberApi} from '^models/TeamMember/api/team-member.api';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const V3OrgTeamMemberShowPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const {currentTeamMember: member, setCurrentTeamMember, isLoading} = useCurrentTeamMember();
    const form = useForm<UpdateTeamMemberDto>();

    useEffect(() => {
        if (!member) return;
        const {name, jobName, phone, email} = makeTeamMemberProfile(member);

        form.setValue('name', name);
        form.setValue('jobName', jobName);
        form.setValue('phone', phone);
        form.setValue('email', email);
    }, [member]);

    const updateFn = () => {
        if (!member) return;
        teamMemberApi
            .update(member.organizationId, member.id, form.getValues())
            .then((res) => setCurrentTeamMember(res.data));
    };

    const deleteFn = () => {
        if (!member) return;
        teamMemberApi.destroy(member.organizationId, member.id).then(({data}) => {
            router.push(V3OrgTeamMembersPageRoute.path(orgId));
            setCurrentTeamMember(null);
        });
    };

    return (
        <V3ModalLikeLayoutMobile
            topRightButtons={[
                () => <EditTriggerButton onClick={updateFn} />,
                () => <DeleteTriggerButton onClick={deleteFn} />,
            ]}
            backBtnOnClick={() => router.push(V3OrgTeamMembersPageRoute.path(orgId))}
        >
            <MobileSection.List className="h-full">
                {isLoading ? (
                    <p className="text-center">loading ...</p>
                ) : (
                    <>
                        <TeamMemberInfoPanel form={form} onSubmit={updateFn} />
                        <TeamListPanel />
                        {/*<TeamMemberSubscriptionListPanel />*/}
                    </>
                )}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
