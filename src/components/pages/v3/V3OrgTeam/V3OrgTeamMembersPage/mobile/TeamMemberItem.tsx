import React, {memo} from 'react';
import {TeamMemberDto} from '^types/team-member.type';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamMemberShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/members/[memberId]';
import {makeTeamMemberProfile} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';

interface TeamMemberItemProps {
    item: TeamMemberDto;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const {item: teamMember} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {name, jobName, profileImgUrl} = makeTeamMemberProfile(teamMember);

    const onClick = () => router.push(V3OrgTeamMemberShowPageRoute.path(orgId, teamMember.id));

    return (
        <div
            className="flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
            onClick={onClick}
        >
            <Avatar src={profileImgUrl} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-xl text-500">{name}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{jobName}</small>
                </p>
            </div>
            <div></div>
        </div>
    );
});
