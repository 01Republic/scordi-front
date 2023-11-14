import React, {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/[teamId]';

interface TeamItemProps {
    item: TeamDto;
}

export const TeamItem = memo((props: TeamItemProps) => {
    const {item: team} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    const onClick = () => router.push(V3OrgTeamShowPageRoute.path(orgId, team.id));

    return (
        <div
            className="flex items-center gap-4 px-3 py-2.5 -mx-3 bg-base-100 text-gray-700 cursor-pointer hover:bg-neutral"
            // onClick={onClick}
        >
            <div className="flex-1">
                <p className="text-xl text-500">{team.name}</p>
                <p className="text-[16px]">
                    <small className="mr-0.5">{team.members.length}명</small>
                </p>
            </div>
            <div></div>
        </div>
    );
});
