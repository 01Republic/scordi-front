import {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {MembershipLevel} from '^models/Membership/types';
import {LeaveButton} from './LeaveButton';
import {UserDto} from '^models/User/types';
import {FcApproval, FcCheckmark} from 'react-icons/fc';

interface InvitedButtonProps {
    currentUser: UserDto;
    teamMember: TeamMemberDto;
    isMe: boolean;
}

export const InvitedButton = memo((props: InvitedButtonProps) => {
    const {currentUser, teamMember, isMe} = props;
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);

    if (!currentUserMembership) return <>!</>; // currentUser 에게 이 조직의 멤버십이 없다면, 애초에 잘못된 접근임.
    if (!teamMember.membership) return <>!</>; // 초대완료된 버튼은 그 정의 그대로 teamMember.membership 을 반드시 가지고 있어야 함.

    // 이 멤버가 본인인 경우
    if (isMe) {
        // - 소유자 레벨이면 : 탈퇴하기 버튼인데 비활성화 (소유자는 탈퇴가 불가능. 멤버로 레벨을 변경해야 함.)
        if (teamMember.membership.level === MembershipLevel.OWNER) {
            return <LeaveButton user={currentUser} disabled />;
        }

        // - 멤버 레벨이면 : 탈퇴하기 버튼 활성화
        if (teamMember.membership.level === MembershipLevel.MEMBER) {
            return <LeaveButton user={currentUser} />;
        }
    }

    // 이 멤버가 본인이 아닌 경우
    // - 본인이 소유자 권한이 없다면 -> 초대완료 버튼 노출
    if (currentUserMembership.level === MembershipLevel.MEMBER) {
        return <CompleteButton />;
    }

    // - 본인이 소유자 권한이 있다면
    if (currentUserMembership.level === MembershipLevel.OWNER) {
        // 이 멤버가 소유자일 때 : 초대완료 버튼 노출
        if (teamMember.membership.level === MembershipLevel.OWNER) {
            return <CompleteButton />;
        }
        // 이 멤버가 멤버일 때 : 탈퇴시키기 버튼 노출
        if (teamMember.membership.level === MembershipLevel.MEMBER) {
            return <LeaveButton user={teamMember.membership.user} text="탈퇴 시키기" />;
        }
    }

    return <></>; // 여기까지 내려오는 케이스가 없어야 함. 무의미.
});
InvitedButton.displayName = 'InvitedButton';

const CompleteButton = memo(() => {
    return (
        <button className="btn btn-sm text-xs !bg-transparent !border-none normal-case gap-2 items-center min-w-[105px] justify-start">
            <FcCheckmark /> 초대완료
        </button>
    );
    // return (
    //     <div className="flex items-center justify-end">
    //         <FcApproval />
    //     </div>
    // );
});
