import {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import PushPin from '/src/images/pushpin.png';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {TeamMembersPageRoute} from '^pages/orgs/[id]/teams/[teamId]/members';

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
    const router = useRouter();
    const orgId = Number(router.query.id);

    return (
        <div
            className="card rounded-xl shadow border border-gray-200 bg-white p-4 cursor-pointer hover:shadow-md transition-all text-center"
            onClick={() => router.push(TeamMembersPageRoute.path(orgId, team.id))}
        >
            <div>
                <Image src={PushPin} width={20} height={20} alt={'p'} />
            </div>
            <div className="font-bold truncate">{team.name}</div>
            <div>
                <Tippy
                    content={
                        <ul>
                            {team.members.map((teamMember, i) => (
                                <li key={i}>
                                    <div className="text-12">
                                        {teamMember.name} ({teamMember.email})
                                    </div>
                                </li>
                            ))}
                        </ul>
                    }
                >
                    <div className="text-14 text-gray-400 text-center group-hover:text-scordi transition-all">
                        {/* TODO: 팀에서 사용중인 앱 갯수 */}
                        {team.members.length.toLocaleString()} Members • {team.members.length.toLocaleString()} Apps
                    </div>
                </Tippy>
            </div>
        </div>
    );
});
TeamListItem.displayName = 'TeamListItem';
