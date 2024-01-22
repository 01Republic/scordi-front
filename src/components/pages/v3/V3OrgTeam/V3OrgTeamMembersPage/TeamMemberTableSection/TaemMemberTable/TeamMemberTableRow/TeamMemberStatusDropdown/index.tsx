import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {FaExchangeAlt, FaRegEnvelope, FaRegTrashAlt, FaSignOutAlt} from 'react-icons/fa';
import {TeamMemberDto} from '^models/TeamMember';
import {currentUserAtom} from '^models/User/atom';
import {Dropdown} from '^v3/share/Dropdown';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {StatusButton} from './StatusButton';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import {FaRotateRight} from 'react-icons/fa6';
import {membershipApi} from '^models/Membership/api';
import {plainToast} from '^hooks/useToast';
import {InviteListItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/InviteListItem';
import {ResendInviteItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/ResendInviteItem';

interface TeamMemberStatusDropdownProps {
    teamMember: TeamMemberDto;
    reload: () => any;
}

const changeLevel = (id: number, level: MembershipLevel) => {
    return membershipApi
        .update(id, {level})
        .then(() => plainToast.success('권한을 변경했어요'))
        .catch((err) => plainToast.error(err.response.data.message));
};

export const TeamMemberStatusDropdown = memo((props: TeamMemberStatusDropdownProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember, reload} = props;

    if (!teamMember || !currentUser) return <></>;

    const memberships = currentUser.memberships || [];
    const {membership} = teamMember;
    const isMe = !!memberships.find((m) => m.id === membership?.id);
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);
    if (!currentUserMembership) return <>!</>;

    return (
        <Dropdown
            placement="bottom-end"
            Trigger={() => <StatusButton teamMember={teamMember} />}
            Content={({hide}) => {
                const hideAndReload = async () => {
                    hide();
                    await reload();
                };

                return (
                    <ul className="p-2 text-sm shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                        {!membership && <InviteListItem teamMember={teamMember} onFinish={hideAndReload} />}
                        {membership && membership.approvalStatus === ApprovalStatus.PENDING && (
                            <ResendInviteItem teamMember={teamMember} onFinish={hideAndReload} />
                        )}

                        {/* change role */}
                        {membership &&
                            membership.approvalStatus === ApprovalStatus.APPROVED &&
                            currentUserMembership.level === MembershipLevel.OWNER && (
                                <>
                                    {membership.level === MembershipLevel.OWNER && (
                                        <MoreDropdownListItem
                                            onClick={() =>
                                                membership &&
                                                changeLevel(membership.id, MembershipLevel.MEMBER).then(hideAndReload)
                                            }
                                        >
                                            <div className="flex items-center gap-3 w-full py-1">
                                                <FaExchangeAlt size={12} />
                                                <p>구성원 역할로 변경하기</p>
                                            </div>
                                        </MoreDropdownListItem>
                                    )}
                                    {membership.level === MembershipLevel.MEMBER && (
                                        <MoreDropdownListItem
                                            onClick={() =>
                                                membership &&
                                                changeLevel(membership.id, MembershipLevel.OWNER).then(hideAndReload)
                                            }
                                        >
                                            <div className="flex items-center gap-3 w-full py-1">
                                                <FaExchangeAlt size={12} />
                                                <p>관리자 역할로 변경하기</p>
                                            </div>
                                        </MoreDropdownListItem>
                                    )}
                                </>
                            )}
                        <hr />

                        {(!membership || membership.approvalStatus === ApprovalStatus.PENDING) && (
                            <MoreDropdownListItem onClick={() => alert('준비중입니다.')}>
                                <div className="flex items-center gap-3 w-full text-red-500 py-1">
                                    <FaRegTrashAlt size={12} />
                                    <p>멤버 삭제하기</p>
                                </div>
                            </MoreDropdownListItem>
                        )}
                        {membership && membership.approvalStatus === ApprovalStatus.APPROVED && (
                            <MoreDropdownListItem onClick={() => alert('준비중입니다.')}>
                                <div className="flex items-center gap-3 w-full text-red-500 py-1">
                                    <FaSignOutAlt size={12} />
                                    <p>워크스페이스에서 내보내기</p>
                                </div>
                            </MoreDropdownListItem>
                        )}
                    </ul>
                );
            }}
        />
    );
});
TeamMemberStatusDropdown.displayName = 'TeamMemberStatusDropdown';
