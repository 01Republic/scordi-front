import React, {memo} from 'react';
import {HiDotsHorizontal} from 'react-icons/hi';
import {FaExchangeAlt, FaRegTrashAlt, FaSignOutAlt} from 'react-icons/fa';
import {useCurrentTeamMember} from '../atom';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {InviteListItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/InviteListItem';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import {ResendInviteItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/ResendInviteItem';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {DeleteMemberItem} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/DeleteMemberItem';
import {membershipApi} from '^models/Membership/api';
import {plainToast} from '^hooks/useToast';
import {toast} from 'react-hot-toast';
import {StatusButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow/TeamMemberStatusDropdown/StatusButton';

const changeLevel = (id: number, level: MembershipLevel) => {
    return membershipApi
        .update(id, {level})
        .then(() => plainToast.success('권한을 변경했어요'))
        .catch((err) => plainToast.error(err.response.data.message));
};

export const PageMoreDropdownMenu = memo(() => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {currentTeamMember: teamMember, reload} = useCurrentTeamMember();

    if (!teamMember || !currentUser) return <></>;

    const memberships = currentUser.memberships || [];
    const {membership} = teamMember;
    const isMe = !!memberships.find((m) => m.id === membership?.id);
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);
    if (!currentUserMembership) return <>!</>;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <button className="btn !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all">
                <StatusButton teamMember={teamMember} />
            </button>

            <div className="dropdown-content menu p-0 shadow-xl bg-white rounded-btn min-w-[180px] !z-[1] text-14 overflow-hidden">
                {/* 1. 초대를 보내지 않았고 **멤버레코드만 존재**하는 상태 : 초대버튼 노출 */}
                {!membership && <InviteListItem teamMember={teamMember} onFinish={reload} />}

                {/* 2. 초대를 보냈으나 **워크스페이스 조인을 기다리는 중**인 멤버 : 재발송 버튼 노출 */}
                {membership && membership.approvalStatus === ApprovalStatus.PENDING && (
                    <ResendInviteItem teamMember={teamMember} onFinish={reload} />
                )}

                {/* 3. 초대를 보내어 **워크스페이스에 조인을 완료**한 멤버 일때 */}
                {/* - 만약 현재 로그인한 유저가 관리자 권한을 가지고 있다면 : 레벨 수정 버튼 노출 */}
                {/* change role */}
                {membership &&
                    membership.approvalStatus === ApprovalStatus.APPROVED &&
                    currentUserMembership.level === MembershipLevel.OWNER && (
                        <>
                            {membership.level === MembershipLevel.OWNER && (
                                <MoreDropdownListItem
                                    onClick={() =>
                                        membership && changeLevel(membership.id, MembershipLevel.MEMBER).then(reload)
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
                                        membership && changeLevel(membership.id, MembershipLevel.OWNER).then(reload)
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
                    <DeleteMemberItem reload={reload} teamMember={teamMember} />
                )}
                {membership && membership.approvalStatus === ApprovalStatus.APPROVED && (
                    <MoreDropdownListItem onClick={() => toast('준비중입니다.')}>
                        <div className="flex items-center gap-3 w-full text-red-500 py-1">
                            <FaSignOutAlt size={12} />
                            <p>워크스페이스에서 내보내기</p>
                        </div>
                    </MoreDropdownListItem>
                )}
            </div>
        </div>
    );
});
PageMoreDropdownMenu.displayName = 'PageMoreDropdownMenu';
