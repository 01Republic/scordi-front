import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {FaExchangeAlt, FaSignOutAlt} from 'react-icons/fa';
import {TeamMemberDto, useSendInviteEmail} from '^models/TeamMember';
import {currentUserAtom, getMembership} from '^models/User/atom';
import {Dropdown} from '^v3/share/Dropdown';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {StatusButton} from './StatusButton';
import {ApprovalStatus, MembershipLevel, t_membershipLevel} from '^models/Membership/types';
import {membershipApi} from '^models/Membership/api';
import {plainToast} from '^hooks/useToast';
import {errorToast} from '^api/api';
import {debounce} from 'lodash';
import {InviteListItem} from './InviteListItem';
import {ResendInviteItem} from './ResendInviteItem';
import {DeleteMemberItem} from './DeleteMemberItem';
import {DeleteMembershipItem} from './DeleteMembershipItem';

interface TeamMemberStatusDropdownProps {
    teamMember: TeamMemberDto;
    reload: () => any;
    setIsLoading: (value: boolean) => any;
}

const changeLevel = (id: number, level: MembershipLevel) => {
    return membershipApi
        .update(id, {level})
        .then(() => plainToast.success('권한을 변경했어요'))
        .catch((err) => plainToast.error(err.response.data.message));
};

export const TeamMemberStatusDropdown = memo((props: TeamMemberStatusDropdownProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {sendEmail} = useSendInviteEmail();
    const {reload, teamMember, setIsLoading} = props;

    if (!teamMember || !currentUser) return <></>;

    const memberships = currentUser.memberships || [];
    const {membership} = teamMember;
    const isMe = !!memberships.find((m) => m.id === membership?.id);
    const currentUserMembership = getMembership(currentUser, teamMember.organizationId);
    if (!currentUserMembership) return <>!</>;

    const sendInvitation = debounce((callback: () => any) => {
        if (!teamMember.email) return;

        setIsLoading(true);
        return sendEmail(teamMember.email, teamMember.id)
            .then(callback)
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, 500);

    if (currentUserMembership.level === MembershipLevel.MEMBER) {
        return <StatusButton teamMember={teamMember} caret={false} />;
    }

    return (
        <Dropdown
            placement="bottom-end"
            Trigger={() => <StatusButton teamMember={teamMember} />}
            Content={({hide}) => {
                const hideAndReload = async () => {
                    hide();
                    return reload();
                };

                return (
                    <ul className="p-2 text-sm shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                        {/* 1. 초대를 보내지 않았고 **멤버레코드만 존재**하는 상태 : 초대버튼 노출 */}
                        {!membership && (
                            <InviteListItem teamMember={teamMember} onClick={() => sendInvitation(hideAndReload)} />
                        )}

                        {/* 2. 초대를 보냈으나 **워크스페이스 조인을 기다리는 중**인 멤버 : 재발송 버튼 노출 */}
                        {membership && membership.approvalStatus === ApprovalStatus.PENDING && (
                            <ResendInviteItem teamMember={teamMember} onClick={() => sendInvitation(hideAndReload)} />
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
                                                membership &&
                                                changeLevel(membership.id, MembershipLevel.MEMBER).then(() => {})
                                            }
                                        >
                                            <div className="flex items-center gap-3 w-full py-1">
                                                <FaExchangeAlt size={12} />
                                                <p>{t_membershipLevel(MembershipLevel.MEMBER)} 역할로 변경하기</p>
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
                                                <p>{t_membershipLevel(MembershipLevel.OWNER)} 역할로 변경하기</p>
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
                            <DeleteMembershipItem teamMember={teamMember} reload={reload} />
                        )}
                    </ul>
                );
            }}
        />
    );
});
TeamMemberStatusDropdown.displayName = 'TeamMemberStatusDropdown';
