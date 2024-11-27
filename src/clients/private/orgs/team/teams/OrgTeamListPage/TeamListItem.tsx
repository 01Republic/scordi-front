import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import PushPin from '/src/images/pushpin.png';
import {orgIdParamState} from '^atoms/common';
import {TeamDto} from '^models/Team/type';
import {OrgTeamDetailPageRoute} from '^pages/orgs/[id]/teams/[teamId]';
import {NextImage} from '^components/NextImage';
import {LinkTo} from '^components/util/LinkTo';

interface TeamListItemProps {
    team: TeamDto;
}

/**
 * 팀명(태그)               구성원 아바타들
 *
 * 구독 갯수
 * 반복지출 금액                할당된 카드
 */
export const TeamListItem = memo((props: TeamListItemProps) => {
    const {team} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {members = []} = team;

    return (
        <LinkTo
            className="card rounded-xl shadow border border-gray-200 bg-white p-4 cursor-pointer hover:shadow-md transition-all text-center after:left-0"
            href={OrgTeamDetailPageRoute.path(orgId, team.id)}
            // loadingOnBtn
            loadingClassName="opacity-30 link_to-clicked after:inset-0 after:m-auto outline outline-1 outline-[#b3b3b3]"
        >
            <div className="flex items-center justify-center mb-[4px]">
                <NextImage src={PushPin} width={20} height={20} alt={'p'} />
            </div>
            <div className="font-bold truncate">{team.name}</div>
            <div className="text-14 text-gray-400 text-center group-hover:text-scordi transition-all">
                {team.teamMemberCount.toLocaleString()} Members • {team.subscriptionCount.toLocaleString()} Apps
            </div>
        </LinkTo>
    );
});
TeamListItem.displayName = 'TeamListItem';
