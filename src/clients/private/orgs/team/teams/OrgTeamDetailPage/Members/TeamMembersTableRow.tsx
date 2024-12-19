import React, {memo} from 'react';
import {teamMemberApi, TeamMemberDto, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {OrgTeamMemberShowPageRoute} from '^pages/orgs/[id]/teamMembers/[teamMemberId]';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import Tippy from '@tippyjs/react';
import {FiMinusCircle} from '^components/react-icons';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {errorToast} from '^api/api';
import {debounce} from 'lodash';

interface TeamMemberTableRowProps {
    teamMember?: TeamMemberDto;
    onClick?: (teamMember: TeamMemberDto) => any;
    reload?: () => any;
}

export const TeamMembersTableRow = memo((props: TeamMemberTableRowProps) => {
    const {teamMember, onClick, reload} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);

    if (!teamMember) return null;

    const showPagePath = OrgTeamMemberShowPageRoute.path(teamMember.organizationId, teamMember.id);

    const hoverBgColor = 'group-hover:bg-scordi-light-50 transition-all';

    const update = debounce((dto: UpdateTeamMemberDto) => {
        return teamMemberApi
            .update(orgId, teamMember.id, {notes: dto.notes})
            .then(() => toast.success('변경사항을 저장했어요.'))
            .then(() => reload && reload())
            .catch(errorToast);
    }, 250);

    const onDelete = () => {
        const deleteConfirm = () => {
            return confirm2(
                `구성원 연결을 해제할까요?`,
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>팀에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </span>,
                'warning',
            );
        };

        confirmed(deleteConfirm())
            .then(() => teamMembershipApi.destroy(orgId, {teamId: teamId, teamMemberId: teamMember.id}))
            .then(() => toast.success('삭제했습니다'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <tr className="group">
            {/* 이름 */}
            <td className={hoverBgColor} onClick={() => onClick && onClick(teamMember)}>
                <OpenButtonColumn href={showPagePath}>
                    <div
                        className={`flex items-center gap-2 px-3 -mx-3 text-gray-700 group-hover:text-scordi max-w-sm`}
                    >
                        <TeamMemberAvatar teamMember={teamMember} className="w-8 h-8" />
                        <div className="">
                            <p className="text-14">
                                <span>{teamMember.name}</span>
                            </p>
                        </div>
                    </div>
                </OpenButtonColumn>
            </td>

            {/* 구독 수 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.subscriptionCount > 0 ? (
                        <small>{teamMember.subscriptionCount.toLocaleString()} Apps</small>
                    ) : (
                        <small>-</small>
                    )}
                </p>
            </td>

            {/* 이메일 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.email}
                </p>
            </td>

            {/* 전화번호 */}
            <td className={`cursor-pointer ${hoverBgColor}`} onClick={() => onClick && onClick(teamMember)}>
                <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 truncate">
                    {teamMember.phone}
                </p>
            </td>

            {/* 권한 */}
            {/*<td className={`cursor-pointer ${hoverBgColor}`}>*/}
            {/*    <TeamMemberTag teamMember={teamMember} onChange={() => reload && reload()} />*/}
            {/*</td>*/}

            {/* 비고 */}
            <td className={`cursor-pointer ${hoverBgColor} `} onClick={() => onClick && onClick(teamMember)}>
                <AirInputText
                    defaultValue={teamMember.notes || undefined}
                    onChange={async (notes) => {
                        if (teamMember.notes === notes) return;
                        return update({notes});
                    }}
                />
            </td>

            <td className={`${hoverBgColor}`}>
                <div className="flex items-center justify-end">
                    <Tippy content="팀에서 제외">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                                onClick={onDelete}
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
TeamMembersTableRow.displayName = 'TeamMembersTableRow';
