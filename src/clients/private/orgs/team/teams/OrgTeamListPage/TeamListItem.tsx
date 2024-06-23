import {Fragment, memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import Tippy from '@tippyjs/react';
import {Avatar} from '^components/Avatar';
import {MdOutlineMoreHoriz} from 'react-icons/md';

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

    // console.log('team', team);

    return (
        <div className="card rounded-lg shadow border border-gray-200 bg-white p-4 cursor-pointer hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
                <div>
                    <TeamTag id={team.id} name={team.name} />
                </div>

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
                        <div className="flex items-center gap-2 group">
                            <div className="flex items-center -space-x-2">
                                {team.members.map((teamMember, i) => {
                                    if (i > 4) return <Fragment key={i} />;
                                    return (
                                        <div key={i} className="rounded-full bg-white z-0">
                                            <TeamMemberAvatar
                                                teamMember={teamMember}
                                                className="w-7 h-7 text-12 opacity-70 group-hover:opacity-100 transition-all"
                                            />
                                        </div>
                                    );
                                })}
                                {team.members.length > 4 && (
                                    <div className="rounded-full bg-white z-0">
                                        <div className="rounded-full w-7 h-7 opacity-70 group-hover:opacity-100 transition-all flex items-center justify-center border border-gray-300">
                                            <MdOutlineMoreHoriz />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="text-14 text-gray-400 group-hover:text-scordi transition-all">
                                {team.members.length.toLocaleString()}명
                            </div>
                        </div>
                    </Tippy>
                </div>
            </div>
            <div>{team.name}</div>
        </div>
    );
});
TeamListItem.displayName = 'TeamListItem';
