import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {membershipApi} from '^models/Membership/api';
import {plainToast} from '^hooks/useToast';

interface TeamMemberRoleProps {
    teamMember: TeamMemberDto;
    onChange: (level: MembershipLevel) => any;
}

export const TeamMemberRole = memo((props: TeamMemberRoleProps) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const {teamMember, onChange} = props;

    if (!teamMember || !currentUser) return <></>;

    const {membership} = teamMember;
    const currentUserMembership = currentUser.memberships?.find((m) => m.organizationId === teamMember.organizationId);

    if (!currentUserMembership) return <>!</>;
    if (membership?.approvalStatus !== ApprovalStatus.APPROVED) return <></>;

    // if (!membership) {
    //     return (
    //         <div
    //             className="tooltip tooltip-top cursor-pointer"
    //             data-tip="아직 워크스페이스에 초대되지 않은 사용자입니다."
    //         >
    //             <p className="capitalize text-sm italic text-gray-400">{'N/A'}</p>
    //         </div>
    //     );
    // }
    //
    // if (membership.approvalStatus === ApprovalStatus.PENDING) {
    //     return (
    //         <div className="tooltip tooltip-top" data-tip="초대 수락을 기다리고 있어요.">
    //             <p className="capitalize text-sm no-selectable opacity-50 italic">pending...</p>
    //         </div>
    //     );
    // }

    if (currentUserMembership.level === MembershipLevel.MEMBER) {
        return <p className="text-sm no-selectable">{membership.level}</p>;
    }

    const onSelect = async (level: MembershipLevel) => {
        if (membership.level === level) return;

        return membershipApi
            .update(membership.id, {level})
            .then(() => onChange(level))
            .then(() => plainToast.success('권한을 변경했어요'))
            .catch((err) => plainToast.error(err.response.data.message));
    };

    return (
        <SelectColumn
            value={membership.level}
            getOptions={async () => Object.values(MembershipLevel)}
            onSelect={onSelect}
            contentMinWidth="240px"
            optionListBoxTitle="권한을 변경합니다"
            inputDisplay={false}
            fullWidth={false}
        />
    );
});
TeamMemberRole.displayName = 'TeamMemberRole';
