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

import {currentTeamMemberState} from '^models/TeamMember/atom';

export const V3OrgTeamMemberShowPage = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {updateFn, deleteFn} = useEditTeamMember();
    const form = useForm<UpdateTeamMemberDto>();
    const currentMember = useRecoilValue(currentTeamMemberState);

    return (
        <V3ModalLikeLayoutMobile
            topRightButtons={[
                () => <EditTriggerButton onClick={() => updateFn(form.getValues(), currentMember)} />,
                () => <DeleteTriggerButton onClick={() => deleteFn(orgId, currentMember)} />,
            ]}
            backBtnOnClick={() => router.push(V3OrgTeamMembersPageRoute.path(orgId))}
        >
            <MobileSection.List className="h-full">
                <TeamMemberShowBody form={form} />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
