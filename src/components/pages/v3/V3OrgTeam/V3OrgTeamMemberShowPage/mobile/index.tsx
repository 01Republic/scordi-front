import React, {memo} from 'react';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {DeleteTriggerButton, EditTriggerButton} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {useRouter} from 'next/router';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberShowBody} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/TeamMemberShowBody';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {useEditTeamMember} from '^models/TeamMember/hook';

export const V3OrgTeamMemberShowPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<UpdateTeamMemberDto>();
    const {updateFn, deleteFn} = useEditTeamMember(form, orgId);

    return (
        <V3ModalLikeLayoutMobile
            topRightButtons={[
                () => <EditTriggerButton onClick={updateFn} />,
                () => <DeleteTriggerButton onClick={deleteFn} />,
            ]}
            backBtnOnClick={() => router.push(V3OrgTeamMembersPageRoute.path(orgId))}
        >
            <MobileSection.List className="h-full">
                <TeamMemberShowBody />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
