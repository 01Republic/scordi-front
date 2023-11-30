import {memo, useEffect, useState} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/TeamMemberShowModal';
import {useSetRecoilState} from 'recoil';
import {currentMemberIdState} from '^models/TeamMember/atom';
import {TeamMemberDto} from '^models/TeamMember/type';
import {approvalStatusOptions, OptionsType} from '^v3/V3OrgSettingsMembersPage/type';

interface MembershipTableRowProps {
    teamMember: TeamMemberDto;
}

export const MembershipTableRow = memo((props: MembershipTableRowProps) => {
    const {open} = useModal(teamMemberShowModal);
    const setMemberId = useSetRecoilState(currentMemberIdState);
    const [badgeOption, setBadgeOption] = useState<OptionsType>();
    const {teamMember} = props;

    useEffect(() => {
        const defaultOption = approvalStatusOptions.find((option) => {
            return option.status === teamMember.membership?.approvalStatus;
        });

        setBadgeOption(defaultOption);
    }, []);

    const onClick = () => {
        open();
        setMemberId(teamMember.id);
    };

    if (!teamMember.membership) return <></>;

    return (
        <tr>
            {/* 이름 */}
            <td onClick={onClick}>
                <div className="flex gap-2.5 items-center">
                    {/*<UserAvatar user={user} />*/}
                    <div>
                        <p className="text-sm font-semibold flex gap-2 items-center">
                            <span>{teamMember.name}</span>
                            <span className={`${badgeOption?.className} badge badge-sm`}>{badgeOption?.label}</span>
                        </p>
                        <p className="block text-xs font-normal text-gray-400">{teamMember.email}</p>
                    </div>
                </div>
            </td>

            {/* 팀 */}
            <td></td>

            {/* 권한 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{teamMember.membership.level.toLowerCase()}</p>
            </td>

            {/* 상태 */}
            <td>
                <p className="capitalize text-sm text-gray-500">{teamMember.membership.approvalStatus.toLowerCase()}</p>
            </td>
        </tr>
    );
});
