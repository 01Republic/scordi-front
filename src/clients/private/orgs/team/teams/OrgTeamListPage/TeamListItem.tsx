import {memo} from 'react';
import PushPin from '^images/pushpin.png';
import {memo, useState} from 'react';
import PushPin from '/src/images/pushpin.png';
import {useOrgIdParam} from '^atoms/common';
import {TeamDto} from '^models/Team/type';
import {OrgTeamDetailPageRoute} from '^pages/orgs/[id]/teams/[teamId]';
import {NextImage} from '^components/NextImage';
import {LinkTo} from '^components/util/LinkTo';
import {TeamMoreDropdown} from './TeamMoreDropdown';
import {LayoutGrid, Users} from 'lucide-react';
import {EditableTeamName} from '^clients/private/orgs/team/teams/OrgTeamListPage/EditableTeamName';

interface TeamListItemProps {
    team: TeamDto;
    reload?: () => any;
}

/**
 * 팀명(태그)               구성원 아바타들
 *
 * 구독 갯수
 * 반복지출 금액                할당된 카드
 */
export const TeamListItem = memo((props: TeamListItemProps) => {
    const {team, reload} = props;
    const orgId = useOrgIdParam();
    const {members = []} = team;
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <LinkTo
            className="card rounded-xl shadow border border-gray-200 bg-white p-4 cursor-pointer hover:shadow-md transition-all text-center after:left-0 group"
            href={OrgTeamDetailPageRoute.path(orgId, team.id)}
            // loadingOnBtn
            loadingClassName="opacity-30 link_to-clicked after:inset-0 after:m-auto outline outline-1 outline-[#b3b3b3]"
        >
            <TeamMoreDropdown team={team} reload={reload} onEdit={() => setIsEditMode(true)} />

            <div className="flex items-center justify-center mb-[4px]">
                <NextImage src={PushPin} width={20} height={20} alt={'p'} />
            </div>

            <EditableTeamName team={team} isEditMode={isEditMode} setIsEditMode={setIsEditMode} reload={reload} />

            <div className="flex items-center justify-center gap-2.5 text-14 text-gray-400">
                <div className="flex items-center gap-1" title="Members">
                    <Users />
                    <div>{team.teamMemberCount.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-1" title="Apps">
                    <LayoutGrid />
                    <div>{team.subscriptionCount.toLocaleString()}</div>
                </div>
            </div>
        </LinkTo>
    );
});
TeamListItem.displayName = 'TeamListItem';
