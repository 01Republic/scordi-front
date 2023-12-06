import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamMemberShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/members/[memberId]';
import {ApprovalStatus} from 'src/models/Membership/types';
import {useOnResize2} from '^components/util/onResize2';
import {useModal} from '^v3/share/modals/useModal';
import {useTeamMemberShowModalSubject} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/hooks';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';

interface TeamMemberItemProps {
    item: TeamMemberDto;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {open} = useModal(teamMemberShowModal);
    const router = useRouter();
    const {isDesktop} = useOnResize2();
    const {setCurrentTeamMember} = useTeamMemberShowModalSubject();

    const {item: teamMember} = props;
    if (!teamMember) return <></>;

    const {profileImgUrl} = teamMember.makeTeamMemberProfile();
    const isPending = teamMember.membership?.approvalStatus === ApprovalStatus.PENDING;

    const onClick = () => {
        if (isDesktop) {
            open();
            setCurrentTeamMember(teamMember);
            return;
        }

        if (!isDesktop) {
            router.push(V3OrgTeamMemberShowPageRoute.path(orgId, teamMember.id));
            return;
        }
    };

    return (
        <div
            className={`flex items-center gap-4 px-3 -mx-3 bg-base-100 text-gray-700  hover:bg-neutral cursor-pointer`}
            onClick={onClick}
        >
            <Avatar src={profileImgUrl} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />

            <div>
                <p className={`font-semibold flex gap-2 items-center ${!isDesktop && 'text-base'}`}>
                    <span>{teamMember.name}</span>
                </p>
                <p className="block text-sm font-normal text-gray-400">{teamMember.email}</p>
            </div>
        </div>
    );
});
