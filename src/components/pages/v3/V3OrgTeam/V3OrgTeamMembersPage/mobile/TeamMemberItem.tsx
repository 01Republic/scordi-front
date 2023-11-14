import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember/types/team-member.type';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamMemberShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/members/[memberId]';
import {useToast} from '^hooks/useToast';

interface TeamMemberItemProps {
    item: TeamMemberDto;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const {item: teamMember} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {name, jobName, profileImgUrl} = teamMember.makeTeamMemberProfile();
    const approvalStatus = teamMember.membership?.approvalStatus;
    const router = useRouter();
    const {toast} = useToast();

    const onClick = () => {
        if (approvalStatus === 'PENDING') {
            toast.error('초대중인 멤버입니다.');
            return;
        }
        router.push(V3OrgTeamMemberShowPageRoute.path(orgId, teamMember.id));
    };

    return (
        <div
            className={`flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700  hover:bg-neutral ${
                approvalStatus === 'PENDING' ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={onClick}
        >
            <Avatar src={profileImgUrl} className="w-8 h-8 outline outline-offset-1 outline-slate-100" />
            <div className="flex-1">
                <p className="text-xl text-500">{name}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{jobName}</small>
                </p>
            </div>
            {approvalStatus === 'PENDING' && <button className="btn btn-xs btn-scordi">초대중</button>}
        </div>
    );
});
